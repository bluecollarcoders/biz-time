// Routes for invoices

const express = require('express');
const ExpressError = require('../expressError');
const db = require('../db');

let router = new express.Router();

// Get / => list of invoices  => {invoices: [{id, comp_code}, ...]}

router.get('/', async function (req, res, next) {
    try {
        const result = await db.query(
            `SELECT id, comp_code
            FROM invoices
            ORDER BY id`
        );
        
        return res.json({'invoices': result.rows});
    }

    catch (err) {
        return next(err);
    }
});

// GET /[id] => detail on invoice  => {invoices: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}

router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;

        const result = await db.query(
            `SELECT i.id,
                    i.comp_code,
                    i.amt,
                    i.paid,
                    i.add_date,
                    c.name,
                    c.description
            FROM invoices AS i INNER JOIN companies AS c ON (i.comp_code = c.code) 
            WHERE id = $1`,
        [id]);

        if (result.rows.length === 0) {
            throw new ExpressError(`No such invoice: ${id}`,404);
        }

        const data = result.rows[0];
        const invoice = {
            id:  data.id,
            company: {
                code: data.comp_code,
                name: data.name,
                description: data.description,
            },
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid_date,
        };
        return res.json({'invoice': invoice});
    }

    catch (err) {
        return next(err);
    }
});

// Post / => add new invoice {comp_code, amt} => {id, comp_code, amt, paid, add_date, paid_date}

router.post('/', async function (req, res, next) {
    try {
        let {comp_code, amt} = req.body;

        const result = await db.query(
            `INSERT INTO invoices (comp_code, amt)
            VALUES ($1, $2)
            RETURNING id, comp_code, amt paid, add_date, paid_date`,
            [comp_code, amt]
        );

        return res.json({'invoice': result.rows[0]});
    }

    catch (err) {
        return next(err);
    }
});
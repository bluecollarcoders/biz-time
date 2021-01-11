// Routes for companies.

const express = require('express');
const slugify = require('slugify');
const ExpressError = require('../expressError')

let router = new express.Router();

// Get / => list of companies

router.get('/', async function (req, res, next) {
    try {
        const result = await db.query(
            `SELECT code, name
            FROM companies
            ORDER BY name`
        );
        return res.json({'companies': result.rows});
    }
    catch (err) {
        return next(err);
    }
});

// get /[code] => detail on company

router.get('/:code', async function (req, res, next) {
    try {
        let code = req.params.code;

        const compResult = await db.query(
            `SELECT code, name, description
            FROM companies
            WHERE code = $1`,
            [code]
        );

        const invResult = await db.query(
            `SELECT id 
            FROM invoices
            WHERE comp_code = $1`,
            [code]
        );
    }
})
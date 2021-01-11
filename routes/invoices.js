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
    }
});
// Routes for companies.

const express = require('express');
const slugify = require('slugify');
const ExpressError = require('../expressError')

let router = new express.Router();


// Tests for companies

const request = require('supertest');

const app = require('../app');
const { createData } = require('../_test-common');
const db = require('../db');

// before each test, clean out data
beforeEach(createData);

afterAll(async () => {
    await db.end()
})

describe('GET /', function () {

    test('It should respond with array of companies', async function () {
        const reponse = await request(app).get('/companies');
        expect(reponse.body).toEqual({
            'companies': [
                {code: 'apple', name: 'Apple'},
                {code: 'ibm', name: 'IBM'},
            ]
        });
    })
}); 
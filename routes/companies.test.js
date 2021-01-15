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


describe('GET /apple', function () {
    
    test("It returns company info", async function () {
        const response = await request(app).get("/companies/apple");
        expect(response.body).toEqual(
            {
                "company": {
                   code: "apple",
                   name: "Apple",
                   description: "Maker of OSX.",
                   invoices: [1,2],
                }
            }
        );
    });

    test("It should return 404 for no such-company", async function () {
        const response = await request(app).get("/companies/blargh");
        expect(response.status).toEqual(404);
    })
});


describe("POST /", function () {
    
    test("It should add company", async function () {
        const response = await request(app)
        .post('/companies')
        .send({name: "TacoTime", description: "Yum!"});

        expect(response.body).toEqual(
            {
                "company": {
                    code: "tacotime",
                    name: "TacoTime",
                    description: "Yum!",
                }
            }
        );
    });

    test("It should return 500 for conflict", async function () {
        const response = await request(app)
           .post("/companies")
           .send({name: "Apple", description: "Huh?"});

        expect(response.status).toEqual(500);
    })
});
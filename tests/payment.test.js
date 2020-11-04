let app = require('../app');
let request = require('supertest');
 
//THIS will work only when below user is registerd and confirmed his email.


test('PAYMENT /payment/order', async (done) => {
    const response = await request(app).post('/payment/order')
    .send({
        name : "name",
        amountInPaise: 500,
        currency : "INR"
    })
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("ORDER CREATED")
    done()
  });
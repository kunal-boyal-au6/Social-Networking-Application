//THIS will work only when below user is registerd and confirmed his email.
let app = require('../app');
let request = require('supertest');

let token;
beforeAll((done) => {
  request(app)
    .post('/login')
    .send({
      password: "deepak",
      email: "deepakshivam1998@gmail.com"
    })
    .end((err, response) => {
      token = response.body.user.token;
      done();
    });
});

//  token not being sent - should respond with a 401
test('WITHOUT TOKEN /getAllUsers', async () => {
  const response = await request(app).get('/getAllUsers')
  expect(response.status).toBe(401)
  expect(response.body.message).toBe("NO ACCESS TOKEN")
  return response
});


// send the token - should respond with a 200
test('WITH TOKEN /getAllUsers', async () => {
  const response = await request(app).get('/getAllUsers').set('Authorization', token)
  expect(response.status).toBe(200);
  expect(response.type).toBe('application/json');
  expect(response.body.message).toBe("ALL USERS")
  return response
});

//GET ALL THE POST
test('ALL POST  /getAllPosts', async () => {
    const response = await request(app).get('/getAllPosts').set('Authorization', token)
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("ALL POSTS")
    return response
  });






  

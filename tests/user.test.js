
let app = require('../app');
let request = require('supertest');

//THIS will work only when below user is registerd and confirmed his email..
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

//Register with new email
// test('NEW USER REGISTER /register', async () => {
//   const response = await request(app).post('/register')
//     .send({
//       password: "shivam",
//       email: "shivam@gmail.com",
//       name: "shivam",
//       dob: "05/06/1998",
//       city: "jaipur"
//     })
//   expect(response.status).toBe(201);
//   expect(response.type).toBe('application/json');
//   expect(response.body.message).toBe("SUCCESSFULLY REGISTERD, CONFIRM YOUR EMAIL")
//   return response
// })

// TRYING TO REGISTER WITH DUPLICATE EMAIL
test('REGISTER WITH DUPLICATE EMAIL /register', async () => {
  const response = await request(app).post('/register')
    .send({
      password: "deepak",
      email: "deepakshivam1998@gmail.com",
      name: "deepak",
      dob: "05/06/1998",
      city: "jaipur"
    })
  expect(response.status).toBe(403);
  expect(response.type).toBe('application/json');
  expect(response.body.message).toBe("THIS EMAIL ALREADY EXIST")
  return response
})



//HIT FORGOT PASSWORD ROUTE IF NO USER EXIST
test('FORGOT PASSWORD MAIL,NO USER EXIST POST/forgotPasswordMail', async () => {
  const response = await request(app).post('/forgotPasswordMail')
    .send({ email: "a@gmail.com" })
  expect(response.status).toBe(404)
  expect(response.type).toBe('application/json');
  expect(response.body.message).toBe("USER NOT FOUND")
  return response
})

//HIT FORGOT PASSWORD ROUTE, USER EXIST
test('FORGOT PASSWORD MAIL,USER EXIST POST/forgotPasswordMail', async () => {
  const response = await request(app).post('/forgotPasswordMail')
    .send({ email: "deepakshivam1998@gmail.com" })
  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json');
  expect(response.body.message).toBe("OTP HAS BEEN SENT TO YOUR EMAIL")
  return response
})

 // LOGOUT 
  // test('LOGOUT /logout', async() => {
  //   const response = await request(app).delete('/logout').set('Authorization', token)
  //   expect(response.status).toBe(200);
  //   expect(response.type).toBe('application/json');
  //   expect(response.body.message).toBe("SUCCESSFULLY LOGGED OUT")
  //   return response
  // });

//DEACTIVATE ACCOUNT   
  // test('DEACTIVATE ACCOUNT /deleteAccount', async() => {
  //   const response = await request(app).delete('/deleteAccount').set('Authorization', token)
  //   expect(response.status).toBe(200);
  //   expect(response.type).toBe('application/json');
  //   expect(response.body.message).toBe("SUCCESSFULLY DEACTIVATED")
  //   return response
  // });






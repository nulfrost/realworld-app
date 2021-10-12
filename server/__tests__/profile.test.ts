import app from 'index';
import request from 'supertest';
import { db } from 'db';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
dotenv.config();

let server;
let token;

beforeAll(async (done) => {
  server = app.listen(4003);
  request(server)
    .post('/api/users')
    .send({
      user: {
        email: 'dane3@test.com',
        password: 'password',
        username: 'Danex18',
      },
    })
    .end((err, response) => {
      if (err) return done(err);
      return done();
    });
  //   request(server)
  //     .post('/api/users/login')
  //     .send({
  //       user: {
  //         email: 'dane3@test.com',
  //         password: 'password',
  //       },
  //     })
  //     .end((err, response) => {
  //       if (err) return done(err);
  //       console.log(response);
  //       token = response.body.user.token;
  //       done();
  //     });
});

afterAll(async () => {
  await db.user.deleteMany();
  await db.$disconnect();
  server.close();
});

describe('Testing the /profiles endpoint', () => {
  it('Should return a 200 status code and a profile for a valid username', (done) => {
    request(server)
      .get('/api/profiles/Danex18')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });
});

import app from 'index';
import request from 'supertest';
import { db } from 'db';

import dotenv from 'dotenv';
dotenv.config();

let server;
let token;

beforeAll(async () => {
  server = app.listen(4002);
});

afterAll(async () => {
  await db.user.deleteMany();
  await db.$disconnect();
  server.close();
});

describe('Testing the /users endpoints', () => {
  describe('Register', () => {
    it('Should return a 400 status code if the username, password or email are missing', (done) => {
      request(server)
        .post('/api/users')
        .send({
          user: {
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
          },
        })
        .expect(400, done);
    });
    it('Should successfully register a user', (done) => {
      request(server)
        .post('/api/users')
        .send({
          user: {
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
            username: process.env.TEST_USERNAME,
          },
        })
        .expect(201, done);
    });
    it('Should return a 422 status code if a users email is already registered', (done) => {
      request(server)
        .post('/api/users')
        .send({
          user: {
            email: 'dane@test.com',
            password: 'password',
            username: 'Danex2',
          },
        })
        .expect(422, done);
    });
  });
  describe('Login', () => {
    it('Should successfully log a user in', (done) => {
      request(server)
        .post('/api/users/login')
        .send({
          user: {
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
          },
        })
        .expect(200)
        .end((err, response) => {
          if (err) return done(err);
          token = response.body.user.token;
          done();
        });
    });
    it('Should return a 422 status code for if the users password is wrong', (done) => {
      request(server)
        .post('/api/users/login')
        .send({
          user: {
            email: process.env.TEST_EMAIL,
            password: 'zxcvbbnm',
          },
        })
        .expect(422, done);
    });
    it('Should return a 200 status code if the user is authenticated and trying to view user information', (done) => {
      request(server)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });
    it('Should return a 401 status code if the user is NOT authenticated and trying to view user information', (done) => {
      request(server).get('/api/users').expect(401, done);
    });
    it('Should return a 200 status code if a user is authenticated and updating their information', (done) => {
      request(server)
        .put('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user: {
            username: 'Danex6',
            email: 'dane2@test.com',
          },
        })
        .end((err, response) => {
          if (err) return done(err);
          expect(response.statusCode).toBe(200);
          expect(response.body.user.username).toBe('Danex6');
          expect(response.body.user.email).toBe('dane2@test.com');
          done();
        });
    });
  });
});

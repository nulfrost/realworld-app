import app from 'index';
import request from 'supertest';
import { db } from 'db';

let server;

beforeAll(async () => {
  server = app.listen(4002);
});

afterAll(async () => {
  await db.user.deleteMany();
  db.$disconnect();
  server.close();
});

describe('Testing the /users endpoints', () => {
  it('POST: /users', (done) => {
    request(server)
      .post('/api/users')
      .send({
        user: {
          email: 'dane@test.com',
          password: 'password',
          username: 'Danex2',
        },
      })
      .expect(201, done);
  });
  it('POST: /users/login', (done) => {
    request(server)
      .post('/api/users/login')
      .send({
        user: {
          email: 'dane@test.com',
          password: 'password',
        },
      })
      .expect(200, done);
  });
});

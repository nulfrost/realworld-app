import app from 'index';
import request from 'supertest';
import { db } from 'db';

let server;

beforeAll(async () => {
  server = app.listen(4003);
});

afterAll(async () => {
  await db.user.deleteMany();
  await db.$disconnect();
  server.close();
});

// test the happy path also

describe('Testing the /profiles endpoint', () => {
  it('Should return a 401 status code for an unauthenticated user trying to view a profile', (done) => {
    request(server).get('/api/profiles/Danex18').expect(401, done);
  });
});

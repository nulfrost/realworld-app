import app from 'index';
import request from 'supertest';
import { db } from 'db';
import { v4 as uuid } from 'uuid';

let server;

beforeAll(async () => {
  server = app.listen(4001);
});

afterAll(async () => {
  server.close();
});

// some endpoints require auth, figure out how to do that here

describe('Testing the /articles endpoints', () => {
  it('GET: /articles', (done) => {
    request(server).get('/api/articles').expect(200, done);
  });
  it('GET: /articles?tag={category}', (done) => {
    request(server).get('/api/articles?tag=lifestyle').expect(200, done);
  });
});

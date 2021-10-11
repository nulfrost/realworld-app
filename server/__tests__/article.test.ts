import app from 'index';
import request from 'supertest';

let server;

beforeAll(() => {
  server = app.listen(4001, () => console.log('server started'));
});

afterAll(() => {
  server.close();
});

describe('GET: /articles', () => {
  it('Should return a list of articles', (done) => {
    request(server).get('/api/articles').expect(200, done);
  });
});

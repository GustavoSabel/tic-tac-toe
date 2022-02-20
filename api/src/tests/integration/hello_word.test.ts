import assert from 'assert';
import supertest from 'supertest'
import { appPromise } from '../../app'

describe('Hello World', () => {
  it('Hello World', (done) => {
    supertest(appPromise)
      .get('/')
      .expect(200)
      .end((err, resp) => {
        if (err) {
          console.log(resp.body)
          done(err)
        }
        assert.deepStrictEqual(resp.body, { title: 'Hello World! 👋' });
        done();
      });
  });
});
import assert from 'assert';
import supertest from 'supertest'
import { appPromise } from '../../app'

// https://blog.logrocket.com/unit-and-integration-testing-for-node-js-apps/
// https://mochajs.org/#getting-started
describe('Player', () => {
  it('should create a new player', (done) => {
    supertest(appPromise)
      .post('/player')
      .send({ name: 'Joao' })
      .expect(200)
      .end((err, resp) => {
        if (err) {
          console.log(resp.body)
          done(err)
        }
        console.log('resp.body', resp.body);
        assert.strictEqual(resp.body.name, 'Joao');
        assert.notStrictEqual(resp.body.id, null);
        done();
      });
  });
});
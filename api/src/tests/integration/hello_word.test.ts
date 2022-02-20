import { appPromise } from '../../app';
import { chai, expect } from '../test_helper';

describe('Hello World', () => {
  it('Hello World', (done) => {
    chai.request(appPromise)
      .get('/')
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ title: 'Hello World! 👋' });
        done();
      });
  });
});
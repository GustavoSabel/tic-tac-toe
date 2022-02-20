import { appPromise } from '../../app'
import { chai, expect } from '../test_helper';

// https://blog.logrocket.com/unit-and-integration-testing-for-node-js-apps/
// https://mochajs.org/#getting-started
describe('Player', function () {
  it('should create a new player', function (done) {
    chai
      .request(appPromise)
      .post('/player')
      .send({ name: 'Joao' })
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.be.equal('Joao')
        expect(res.body.id).to.be.not.null
        done();
      });
  });
});
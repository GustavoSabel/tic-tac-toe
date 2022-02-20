import { appPromise } from '../../app'
import { chai, expect } from '../test_helper';

describe('Player', function () {
  it('should create a new player', async function () {
    const res = await chai
      .request(appPromise)
      .post('/player')
      .send({ name: 'Joao' });
    expect(res).to.have.status(200);
    expect(res.body.name).to.be.equal('Joao')
    expect(res.body.id).to.be.not.null
  });
});
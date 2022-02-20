import { appPromise } from '../../app';
import { chai, expect } from '../test_helper';

describe('Hello World', function () {
  it('Hello World', async function () {
    const res = await chai.request(appPromise).get('/')
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ title: 'Hello World! 👋' });
  });
});
import { Application } from 'express';
import { chai, expect } from '@tests/test_helper';
import { getApp } from '@tests/test_helper_integration';

describe('Hello World', function () {
  let app: Application
  before(async function () {
    app = await getApp()
  });
  
  it('Hello World', async function () {
    const res = await chai.request(app).get('/')
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ title: 'Hello World! 👋' });
  });
});
import { Application } from 'express';
import { chai, expect } from '../test_helper';
import { getApp } from '../test_helper_integration';

describe('Player', function () {
  let app: Application
  before(async function () {
    app = await getApp()
  });
  
  it('should create a new player', async function () {
    const res = await chai
      .request(app)
      .post('/player')
      .send({ name: 'Joao' });
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body.name).to.be.equal('Joao')
    expect(res.body.id).to.be.not.null
  });
  
  it('should fail when the name is not informed', async function () {
    const res = await chai
      .request(app)
      .post('/player');
    expect(res).to.have.status(400);
  });
  
  it('should fail when the name is null', async function () {
    const res = await chai
      .request(app)
      .post('/player')
      .send({ name: null });
    expect(res).to.have.status(400);
  });
  
  // TODO: implement
  it.skip('should fail when the name is empty', async function () {
    const res = await chai
      .request(app)
      .post('/player')
      .send({ name: '  ' });
    expect(res).to.have.status(400);
  });
});
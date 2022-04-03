import Game from '@src/domain/entities/game.entity';
import Player from '@src/domain/entities/player.entity';
import { PlayerType } from '@src/types/PlayerType';
import { Application } from 'express';
import { chai, expect } from '../test_helper';
import { getApp } from '../test_helper_integration';

describe('Game', function () {
  let app: Application
  before(async function () {
    app = await getApp()
  });
  
  it('new game', async function () {
    const playerO = await Player.create({ name: 'Joao' }).save();
    const playerX = await Player.create({ name: 'Maria' }).save();
    const res = await chai
      .request(app)
      .post('/game')
      .send({ 
        playerOId: playerO.id,
        playerXId: playerX.id,
      });
    expect(res).to.have.status(200);
    expect(res.body.gameId).to.be.greaterThan(0);
    expect(res.body.match).to.be.equal(1)
    expect(res.body.nextPlayer).to.be.equal('O')
    expect(res.body.board).to.be.deep.equal([
      '', '', '',
      '', '', '',
      '', '', '',
    ])
  });
  
  it('place a token', async function () {
    const playerO = await Player.create({ name: 'Joao' }).save();
    const playerX = await Player.create({ name: 'Maria' }).save();

    const newGame = new Game();
    newGame.startTime = new Date();
    newGame.neededToWin = 3;
    newGame.numberOfMoves = 0;
    newGame.playerO = playerO;
    newGame.playerX = playerX;
    newGame.winners = [];
    newGame.cleanBoard();
    newGame.playerStartedCurrentMatch = 'O'
    await newGame.save();

    const res = await chai
      .request(app)
      .post(`/game/${newGame.id}/placeToken`)
      .send({ 
        player: 'O',
        row: 0,
        col: 0,
      });
    expect(res).to.have.status(200);
    expect(res.body.match).to.be.equal(1)
    expect(res.body.nextPlayer).to.be.equal('X')
    expect(res.body.board).to.be.deep.equal([
      'O', '', '',
      '', '', '',
      '', '', '',
    ])
  });
  
  it('Win', async function () {
    const playerO = await Player.create({ name: 'Joao' }).save();
    const playerX = await Player.create({ name: 'Maria' }).save();
    const res = await chai
      .request(app)
      .post('/game')
      .send({ 
        playerOId: playerO.id,
        playerXId: playerX.id,
      });
    const gameId = res.body.gameId

    expect((await play('O', 0, 0)).board).to.be.deep.equal([
      'O', '', '',
      '', '', '',
      '', '', '',
    ])

    expect((await play('X', 1, 0)).board).to.be.deep.equal([
      'O', '', '',
      'X', '', '',
      '', '', '',
    ])

    expect((await play('O', 1, 1)).board).to.be.deep.equal([
      'O', '', '',
      'X', 'O', '',
      '', '', '',
    ])

    expect((await play('X', 2, 2)).board).to.be.deep.equal([
      'O', '', '',
      'X', 'O', '',
      '', '', 'X',
    ])

    expect((await play('O', 0, 2)).board).to.be.deep.equal([
      'O', '', 'O',
      'X', 'O', '',
      '', '', 'X',
    ])

    expect((await play('X', 0, 1)).board).to.be.deep.equal([
      'O', 'X', 'O',
      'X', 'O', '',
      '', '', 'X',
    ])

    const winResponse = await play('O', 2, 0)
    expect(winResponse.board).to.be.deep.equal([
      'O', 'X', 'O',
      'X', 'O', '',
      'O', '', 'X',
    ])
    expect(winResponse.victory).to.be.deep.equal([
      '', '', 'O',
      '', 'O', '',
      'O', '', '',
    ])
    expect(winResponse.nextPlayer).to.be.equal('X')
    expect(winResponse.winners).to.be.deep.equal(['O'])

    async function play(player: PlayerType, row: number, col: number) {
      const res = await chai
        .request(app)
        .post(`/game/${gameId}/placeToken`)
        .send({ player, row, col });
      expect(res).to.have.status(200);
      return res.body
    }
  });
});
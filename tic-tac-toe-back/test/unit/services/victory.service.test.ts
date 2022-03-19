import Board from '@src/valueObjects/Board';
import { expect } from '@test/test_helper';

describe('Check victory', function () {
  it('O should win', function () {
    const board = Board.fromBeauty([
      'O X O', 
      'O _ X', 
      'O X _',
    ]);

    const victory = board.checkIfPlayerHasAVictory('O');

    expect(victory).to.not.be.empty;
    expect(victory!.beautifyBoard()).to.be.deep.equal([
      'O _ _', 
      'O _ _', 
      'O _ _',
    ]);
  });

  it('X should win', function () {
    const board = Board.fromBeauty([
      'X X _', 
      'O X X', 
      'O O X',
    ]);

    const victory = board.checkIfPlayerHasAVictory('X');

    const row1 = 'X _ _';
    const row2 = '_ X _';
    const row3 = '_ _ X';
    const rows = [row1, row2, row3];
    expect(victory).to.not.be.null;
    expect(victory!.beautifyBoard()).to.be.deep.equal(rows);
  });

  it('O should not win', function () {
    const board = Board.fromBeauty([
      'X X _', 
      'O X X', 
      'O O X',
    ]);

    const victory = board.checkIfPlayerHasAVictory('O');

    expect(victory).to.be.null;
  });

  it('X should not win', function () {
    const board = Board.fromBeauty([
      'O X O', 
      'O _ X', 
      'O X _',
    ]);

    const victory = board.checkIfPlayerHasAVictory('X');

    expect(victory).to.be.null;
  });
});

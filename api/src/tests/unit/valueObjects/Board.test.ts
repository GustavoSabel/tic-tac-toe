import Board from '@valueObjects/Board';
import { expect } from '@tests/test_helper';

describe('Board', function () {
  it('Create empty', function () {
    const board = Board.CreateEmptyBoard();

    const row1 = '_ _ _';
    const row2 = '_ _ _';
    const row3 = '_ _ _';
    const rows = [row1, row2, row3];
    expect(board.beautifyBoard()).to.be.deep.equal(rows);
  });

  it('Create from beauty', function () {
    const board = Board.fromBeauty([
      'X _ O',
      'O X _',
      'O _ X',
    ]);

    expect(board.BoardArray).to.be.deep.equal([
      'X', '', 'O', 
      'O', 'X', '', 
      'O', '', 'X',
    ]);
  });

  it('Set value', function () {
    const board = Board.CreateEmptyBoard();
    board.setValue(0, 0, 'O');
    board.setValue(2, 2, 'X');
    board.setValue(1, 1, 'O');
    board.setValue(0, 2, 'X');
    board.setValue(2, 0, 'O');

    const row1 = 'O _ X';
    const row2 = '_ O _';
    const row3 = 'O _ X';
    const rows = [row1, row2, row3];
    expect(board.beautifyBoard()).to.be.deep.equal(rows);
  });

  it('Get value', function () {
    const board = new Board(['', '', 'X', '', '', '', '', '', 'O']);
    expect(board.getValue(0, 0)).to.be.deep.equal('');
    expect(board.getValue(0, 2)).to.be.deep.equal('X');
    expect(board.getValue(2, 2)).to.be.deep.equal('O');
  });

  it('Clean', function () {
    const board = new Board(['O', '', 'X', 'O', '', '', 'O', 'X', '']);

    board.clean();

    const row1 = '_ _ _';
    const row2 = '_ _ _';
    const row3 = '_ _ _';
    const rows = [row1, row2, row3];
    expect(board.beautifyBoard()).to.be.deep.equal(rows);
  });

  it('Beautify', function () {
    const board = new Board(['O', '', 'X', 'O', '', '', 'O', 'X', '']);

    const row1 = 'O _ X';
    const row2 = 'O _ _';
    const row3 = 'O X _';
    const rows = [row1, row2, row3];
    expect(board.beautifyBoard()).to.be.deep.equal(rows);
  });
});

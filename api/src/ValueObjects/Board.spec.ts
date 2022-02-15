import Board from '../ValueObjects/Board';

describe('Board', () => {
  it('Create empty', () => {
    const board = Board.CreateEmptyBoard();

    const row1 = '_ _ _';
    const row2 = '_ _ _';
    const row3 = '_ _ _';
    const rows = [row1, row2, row3];
    expect(board.beautifyBoard()).toEqual(rows);
  });

  it('Create from beauty', () => {
    const board = Board.fromBeauty([
      'X _ O',
      'O X _',
      'O _ X',
    ]);

    expect(board.BoardArray).toEqual([
      'X', '', 'O', 
      'O', 'X', '', 
      'O', '', 'X',
    ]);
  });

  it('Set value', () => {
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
    expect(board.beautifyBoard()).toEqual(rows);
  });

  it('Get value', () => {
    const board = new Board(['', '', 'X', '', '', '', '', '', 'O']);
    expect(board.getValue(0, 0)).toEqual('');
    expect(board.getValue(0, 2)).toEqual('X');
    expect(board.getValue(2, 2)).toEqual('O');
  });

  it('Clean', () => {
    const board = new Board(['O', '', 'X', 'O', '', '', 'O', 'X', '']);

    board.clean();

    const row1 = '_ _ _';
    const row2 = '_ _ _';
    const row3 = '_ _ _';
    const rows = [row1, row2, row3];
    expect(board.beautifyBoard()).toEqual(rows);
  });

  it('Beautify', () => {
    const board = new Board(['O', '', 'X', 'O', '', '', 'O', 'X', '']);

    const row1 = 'O _ X';
    const row2 = 'O _ _';
    const row3 = 'O X _';
    const rows = [row1, row2, row3];
    expect(board.beautifyBoard()).toEqual(rows);
  });
});

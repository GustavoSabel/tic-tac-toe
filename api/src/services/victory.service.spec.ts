import Board from '../ValueObjects/Board';
import VictoryService from './victory.service';

describe('Check victory', () => {
  it('O should win', () => {
    const board = new Board([
      'O', 'X', '', 
      'O', '', '', 
      'O', '', 'X',
    ]);

    const victory = VictoryService.getVictory('O', board);

    expect(victory).not.toBeNull();
    expect(victory!.beautifyBoard()).toEqual([
      'O _ _', 
      'O _ _', 
      'O _ _',
    ]);
  });

  it('X should win', () => {
    const board = new Board(['X', 'O', '', 'O', 'X', '', '', '', 'X']);

    const victory = VictoryService.getVictory('X', board);

    const row1 = 'X _ _';
    const row2 = '_ X _';
    const row3 = '_ _ X';
    const rows = [row1, row2, row3];
    expect(victory).not.toBeNull();
    expect(victory!.beautifyBoard()).toEqual(rows);
  });

  it('O should not win', () => {
    const board = new Board(['X', 'O', '', 'O', 'X', '', '', '', 'X']);

    const victory = VictoryService.getVictory('O', board);

    expect(victory).toBeNull();
  });

  it('X should not win', () => {
    const board = new Board(['O', 'X', '', 'O', '', '', 'O', '', 'X']);

    const victory = VictoryService.getVictory('X', board);

    expect(victory).toBeNull();
  });
});

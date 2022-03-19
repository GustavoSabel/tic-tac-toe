import Board from '@src/valueObjects/Board';
import { AllVictories } from '@src/valueObjects/Victory';
import { expect } from '@test/test_helper';

describe('Board', function () {
  it('To board', function () {
    const expected = Board.fromBeauty([
      'O O O', 
      '_ _ _', 
      '_ _ _',
    ]);

    const result = AllVictories[0].toBoard('O')
    expect(result.BoardArray).to.be.deep.equal(expected.BoardArray)
  });

  it('O should win', function () {
    const board = Board.fromBeauty([
      'O O O', 
      'X _ X', 
      'O X _',
    ]);

    const result = AllVictories[0].checkIfPlayerHasThisVictory('O', board)
    expect(result).to.be.true
  });

  it('O should not win', function () {
    const board = Board.fromBeauty([
      'O X O', 
      'X _ X', 
      'O X _',
    ]);

    const result = AllVictories[0].checkIfPlayerHasThisVictory('O', board)
    expect(result).to.be.false
  });
})
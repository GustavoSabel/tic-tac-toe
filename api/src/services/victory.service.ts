import Board from '../objects/board';
import {PlayerType} from '../types/PlayerType';

type VictoryType = ('✅' | '⬛')[][];

const allVictories: VictoryType[] = [
  [
    ['✅', '✅', '✅'],
    ['⬛', '⬛', '⬛'],
    ['⬛', '⬛', '⬛'],
  ],
  [
    ['⬛', '⬛', '⬛'],
    ['✅', '✅', '✅'],
    ['⬛', '⬛', '⬛'],
  ],
  [
    ['⬛', '⬛', '⬛'],
    ['⬛', '⬛', '⬛'],
    ['✅', '✅', '✅'],
  ],
  [
    ['✅', '⬛', '⬛'],
    ['✅', '⬛', '⬛'],
    ['✅', '⬛', '⬛'],
  ],
  [
    ['⬛', '✅', '⬛'],
    ['⬛', '✅', '⬛'],
    ['⬛', '✅', '⬛'],
  ],
  [
    ['⬛', '⬛', '✅'],
    ['⬛', '⬛', '✅'],
    ['⬛', '⬛', '✅'],
  ],
  [
    ['✅', '⬛', '⬛'],
    ['⬛', '✅', '⬛'],
    ['⬛', '⬛', '✅'],
  ],
  [
    ['⬛', '⬛', '✅'],
    ['⬛', '✅', '⬛'],
    ['✅', '⬛', '⬛'],
  ],
];

export default class VictoryService {
  public static getVictory(player: PlayerType, board: Board): Board | null {
    for (let i = 0; i < allVictories.length; i++) {
      const victory = allVictories[i];
      if (this.checkVictory(player, board, victory)) {
        const boardArray = victory.flatMap(a =>
          a.map(x => (x === '✅' ? player : ''))
        );
        return new Board(boardArray);
      }
    }
    return null;
  }

  private static checkVictory(
    player: PlayerType,
    board: Board,
    victory: VictoryType
  ) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (victory[row][col] === '✅') {
          if (board.getValue(row, col) !== player) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

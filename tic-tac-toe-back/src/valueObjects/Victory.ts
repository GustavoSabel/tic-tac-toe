import { PlayerType } from '@src/types/PlayerType';
import Board from './Board';

type VictoryType = ('✅' | '⬛')[][];

export default class Victory {
  constructor(private _boardArray: VictoryType) {
  }

  public checkIfPlayerHasThisVictory(player: PlayerType, board: Board) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this._boardArray[row][col] === '✅') {
          if (board.getValue(row, col) !== player) {
            return false;
          }
        }
      }
    }
    return true;
  }

  toBoard(victoryPlayer: PlayerType) {
    const boardArray = this._boardArray.flatMap((a) => a.map((x) => (x === '✅' ? victoryPlayer : '')));
    return new Board(boardArray);
  }
}

export const AllVictories: Victory[] = [
  new Victory([
    ['✅', '✅', '✅'],
    ['⬛', '⬛', '⬛'],
    ['⬛', '⬛', '⬛'],
  ]),
  new Victory([
    ['⬛', '⬛', '⬛'],
    ['✅', '✅', '✅'],
    ['⬛', '⬛', '⬛'],
  ]),
  new Victory([
    ['⬛', '⬛', '⬛'],
    ['⬛', '⬛', '⬛'],
    ['✅', '✅', '✅'],
  ]),
  new Victory([
    ['✅', '⬛', '⬛'],
    ['✅', '⬛', '⬛'],
    ['✅', '⬛', '⬛'],
  ]),
  new Victory([
    ['⬛', '✅', '⬛'],
    ['⬛', '✅', '⬛'],
    ['⬛', '✅', '⬛'],
  ]),
  new Victory([
    ['⬛', '⬛', '✅'],
    ['⬛', '⬛', '✅'],
    ['⬛', '⬛', '✅'],
  ]),
  new Victory([
    ['✅', '⬛', '⬛'],
    ['⬛', '✅', '⬛'],
    ['⬛', '⬛', '✅'],
  ]),
  new Victory([
    ['⬛', '⬛', '✅'],
    ['⬛', '✅', '⬛'],
    ['✅', '⬛', '⬛'],
  ]),
];
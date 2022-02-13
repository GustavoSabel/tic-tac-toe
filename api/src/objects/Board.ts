import {BoardType} from '../types/BoardType';
import {NonePlayerType, PlayerType} from '../types/PlayerType';

export default class Board {
  constructor(boardArray: BoardType) {
    this._boardArray = [...boardArray];
  }

  public static CreateEmptyBoard() {
    return new Board(['', '', '', '', '', '', '', '', '']);
  }

  get BoardArray(): BoardType {
    return this._boardArray;
  }
  private _boardArray: BoardType;

  private calcPosition(row: number, col: number) {
    return row * 3 + col;
  }

  public getValue(row: number, col: number): NonePlayerType | PlayerType {
    return this._boardArray[this.calcPosition(row, col)];
  }

  public setValue(row: number, col: number, value: PlayerType) {
    this._boardArray[this.calcPosition(row, col)] = value;
  }

  public clean() {
    for (let i = 0; i < this._boardArray.length; i++) {
      this._boardArray[i] = '';
    }
  }
}

import { BoardType } from '@src/types/BoardType';
import { NonePlayerType, PlayerType } from '@src/types/PlayerType';

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

  /**
   *
   * @returns
   * ```js
   * ['O _ X',
   *  'O X X',
   *  'O _ _']
   * ```
   */
  public beautifyBoard(): string[] {
    const beautyBoard = this.BoardArray.map((x) => (!x ? '_' : x));
    return [
      beautyBoard.slice(0, 3).join(' '),
      beautyBoard.slice(3, 6).join(' '),
      beautyBoard.slice(6, 9).join(' '),
    ];
  }

  /**
   * 
   * @param board
   * ```js
   * ['O _ X',
   *  'O X X',
   *  'O _ _']
   * ```
   */
  public static fromBeauty(board: string[]): Board {
    const beautyBoard = board.flatMap(x => x.split(' ').map(cell => {
      if(cell === 'O') return 'O';
      if(cell === 'X') return 'X';
      return '';
    }))
    return new Board(beautyBoard)
  }
}

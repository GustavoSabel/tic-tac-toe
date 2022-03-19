import { BoardType } from '@src/types/BoardType';
import { NonePlayerType, PlayerType } from '@src/types/PlayerType';

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

  public checkIfPlayerHasAVictory(player: PlayerType): Board | null {
    for (let i = 0; i < allVictories.length; i++) {
      const victory = allVictories[i];
      if (this.checkVictory(player, victory)) {
        const boardArray = victory.flatMap((a) => a.map((x) => (x === '✅' ? player : '')));
        return new Board(boardArray);
      }
    }
    return null;
  }

  private checkVictory(player: PlayerType, victory: VictoryType) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (victory[row][col] === '✅') {
          if (this.getValue(row, col) !== player) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

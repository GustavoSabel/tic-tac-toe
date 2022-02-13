import Game from '../entities/game.entity';
import {BoardType} from '../types/BoardType';
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
  public static getVictory(player: PlayerType, game: Game): BoardType | null {
    for (let i = 0; i < allVictories.length; i++) {
      const victory = allVictories[i];
      if (this.checkVictory(player, game, victory)) {
        return victory.flatMap(a => a.map(x => (x === '✅' ? player : '')));
      }
    }
    return null;
  }

  private static checkVictory(
    player: PlayerType,
    game: Game,
    victory: VictoryType
  ) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (victory[row][col] === '✅') {
          if (game.getBoardValue(row, col) !== player) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

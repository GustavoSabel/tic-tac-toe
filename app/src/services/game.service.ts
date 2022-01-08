import {GameStatusDTO} from '../dtos/gamestatus.dto';
import {GameIdDTO} from '../dtos/gameid.dto';
import Game from '../entities/game.entity';
import Player from '../entities/player.entity';
import {BadRequest} from 'http-errors';

type NewGameArgs = {
  player1Id: number;
  player2Id: number;
};

type PlaceTokenArgs = {
  gameId: number;
  playerId: number;
  row: number;
  col: number;
};

export default class GameService {
  static async gameStatus(gameId: number): Promise<GameStatusDTO> {
    throw new Error('Not Implemented');
  }

  static async newGame(args: NewGameArgs): Promise<GameIdDTO> {
    const player1 = await Player.findOneOrFail(args.player1Id);
    const player2 = await Player.findOneOrFail(args.player2Id);

    const newGame = new Game();
    newGame.startTime = new Date();
    newGame.neededToWin = 3;
    newGame.numberOfMoves = 0;
    newGame.playerOne = player1;
    newGame.playerTwo = player2;
    newGame.winners = [];
    newGame.cleanBoard();
    await newGame.save();
    return {
      gameId: newGame.id,
    };
  }

  static async placeToken(args: PlaceTokenArgs) {
    const game = await Game.findOneOrFail(args.gameId);
    if (game.endTime) {
      throw new BadRequest('This game is finished. Please create a new game');
    }

    if (
      args.playerId !== game.playerOne.id &&
      args.playerId !== game.playerTwo.id
    ) {
      throw new BadRequest('Invalid user to this game');
    }

    if (args.col < 0 || args.col > 2) {
      throw new BadRequest('Invalid column position');
    }
    if (args.row < 0 || args.row > 2) {
      throw new BadRequest('Invalid row position');
    }

    const currentPlayerNumber = game.playerOne.id === args.playerId ? 1 : 2;
    const currentPlayer =
      game.playerOne.id === args.playerId ? game.playerOne : game.playerTwo;

    if (game.lastPlayed === currentPlayerNumber) {
      throw new BadRequest(`Player ${currentPlayerNumber} already made a move`);
    }
    if (game.getBoardValue(args.row, args.col)) {
      throw new BadRequest('This position already has been used');
    }

    game.setBoardValue(args.row, args.col, currentPlayerNumber.toString());
    const newBoard = game.board.map(x => x);
    game.lastPlayed = currentPlayerNumber;
    game.numberOfMoves += 1;

    let message = `Player ${currentPlayer.name} places a token in row ${
      args.row + 1
    } and col ${args.col + 1}`;
    if (
      this.checkIfPlayerWins(currentPlayerNumber.toString() as '1' | '2', game)
    ) {
      game.winners.push(currentPlayerNumber.toString());
      game.cleanBoard();
      game.numberOfMoves = 0;
      game.lastPlayed = undefined;
      message = `PLAYER ${currentPlayer.name.toUpperCase()} WINS!!`;
    } else {
      if (this.allBoardIsFilled(game)) {
        game.cleanBoard();
        game.numberOfMoves = 0;
        game.lastPlayed = undefined;
        message = 'It was a tie :(';
      }
    }

    const numberOfVictoriesOfCurrentPlayer = game.winners.reduce(
      (p, winner) => (winner === currentPlayerNumber.toString() ? p + 1 : p),
      0
    );
    if (numberOfVictoriesOfCurrentPlayer >= game.neededToWin) {
      game.endTime = new Date();
      game.finalWinner = currentPlayerNumber;
      message = `PLAYER ${currentPlayer.name.toUpperCase()} WINS ${
        game.neededToWin
      } TIMES!!! HE IS THE WINNER!! THE BEST PLAYER EVER!! Game over`;
    }

    await game.save();

    return {
      gameId: game.id,
      message,
      player1: game.playerOne.name,
      player2: game.playerTwo.name,
      board: this.beautifyBoard(newBoard),
      winners: game.winners,
    };
  }

  private static beautifyBoard(board: string[]) {
    board = board.map(x => (!x ? '_' : x));
    return [
      board.slice(0, 3).join(' '),
      board.slice(3, 6).join(' '),
      board.slice(6, 9).join(' '),
    ];
  }

  private static allBoardIsFilled(game: Game) {
    for (let i = 0; i < game.board.length; i++) {
      if (!game.board[i]) {
        return false;
      }
    }
    return true;
  }

  private static checkIfPlayerWins(player: '1' | '2', game: Game) {
    const victories: ('✅' | '⬛')[][][] = [
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

    for (let i = 0; i < victories.length; i++) {
      const victory = victories[i];
      if (this.checkVictory(player, game, victory)) {
        return true;
      }
    }
    return false;
  }

  private static checkVictory(
    player: '1' | '2',
    game: Game,
    victory: ('✅' | '⬛')[][]
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

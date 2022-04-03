import { useEffect, useState } from "react";
import gameService from "../../Services/gameService";
import playerService, { PlayerContract } from "../../Services/playerService";
import Field from "../Field";
import GameStatus from "../GameStatus";
import { BoardType } from "../../Types/BoardType";
import { GameStatusType } from "../../Types/GameStatusType";
import { PlayerType } from "../../Types/PlayerType";
import { CenterBlock, Container, Game, NewGameButton, StartGameButton } from "./style";
import Scoreboard from "../Scoreboard";
import { NonePlayerType } from "../../Types/NonePlayerType";

type Status = {
  status: GameStatusType
  matchWinner: PlayerType | null,
  finalWinner: PlayerType | NonePlayerType,
  victory: BoardType | null,
  winners: PlayerType[],

}
const emptyGame: BoardType = [
  '', '', '',
  '', '', '',
  '', '', '',
]

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('O')
  const [playerO, setPlayerO] = useState<PlayerContract>()
  const [playerX, setPlayerX] = useState<PlayerContract>()
  const [gameId, setGameId] = useState<number>()
  const [status, setStatus] = useState<Status>({
    status: 'waitingToStart',
    matchWinner: null,
    victory: null,
    finalWinner: '',
    winners: [],
  })
  const [game, setGame] = useState<BoardType>(emptyGame);

  const click = async (index: number) => {
    if (status.status === 'playing') {
      if (game[index] === '' && gameId) {
        const response = await gameService.placeToken(gameId, {
          player: currentPlayer,
          row: Math.trunc(index / 3),
          col: index % 3,
        });
        setGame(response.board)
        setCurrentPlayer(response.nextPlayer)
        setStatus({
          status: response.status,
          matchWinner: response.matchWinner,
          victory: response.victory,
          winners: response.winners,
          finalWinner: response.finalWinner,
        })
      }
    }
  }

  useEffect(() => {
    const createPlayers = async () => {
      const playerO = await playerService.create('Player O')
      const playerX = await playerService.create('Player X')
      setPlayerO(playerO)
      setPlayerX(playerX)
    }
    createPlayers()
  }, [])

  useEffect(() => {
    if (status.status === 'finished') {
      alert(`${status.finalWinner} won the game!`)
    }
  }, [status])

  const startGame = async () => {
    const game = await gameService.newGame({
      playerOId: playerO!.id,
      playerXId: playerX!.id,
    })
    setGameId(game.gameId)
    setGame(emptyGame)
    setStatus({
      status: 'playing',
      winners: [],
      victory: null,
      matchWinner: null,
      finalWinner: '',
    })
  }

  const newMatch = () => {
    setGame(emptyGame)
    setStatus(old => ({
      ...old,
      status: 'playing',
      matchWinner: null,
      victory: null,
    }))
  }

  return (
    <Container>
      <CenterBlock>
        <GameStatus status={status.status} currentPlayer={currentPlayer} winner={status.matchWinner} />
        {(status.status !== 'waitingToStart') &&
          <Scoreboard winners={status.winners} />
        }
        <Game>
          {game.map((g, i) => (
            <Field
              onClick={() => click(i)}
              player={g === '' ? undefined : g}
              playerStatus={status.status === 'winMatch' && status.victory && status.victory[i] !== '' ? 'winner' : 'normal'} />
          ))}
        </Game>
        {(status.status === 'winMatch' || status.status === 'drawMatch') &&
          <NewGameButton onClick={newMatch}>New game</NewGameButton>}
        {(status.status === 'waitingToStart') &&
          <StartGameButton onClick={startGame}>Start</StartGameButton>}
        {(status.status === 'finished') &&
          <StartGameButton onClick={startGame}>Start a new Game</StartGameButton>}
      </CenterBlock>
    </Container>
  );
}

export default TicTacToe
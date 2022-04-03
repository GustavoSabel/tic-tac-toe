import { useState } from "react";
import gameService from "../../Services/gameService";
import playerService, { PlayerContract } from "../../Services/playerService";
import Field from "../Field";
import GameStatus from "../GameStatus";
import { BoardType } from "../../Types/BoardType";
import { GameStatusType } from "../../Types/GameStatusType";
import { PlayerType } from "../../Types/PlayerType";
import { CenterBlock, Container, Game, NewGameButton, StartGameButton } from "./style";
import Scoreboard from "../Scoreboard";

type Status = {
  status: GameStatusType
  winner: PlayerType | null,
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
    winner: null,
    victory: null,
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
        if (response.victory) {
          setStatus({
            status: 'playerWin',
            winner: currentPlayer,
            victory: response.victory,
            winners: response.winners,
          })
        } else if (response.draw) {
          setStatus(current => ({
            ...current,
            status: 'draw',
            winners: response.winners,
          }))
        }

        if (response.endOfGame) {
          // TODO: Improve that
          alert(`Player ${response.finalWinner} win 3 matches!! He wins the game`)
        }
      }
    }
  }

  const startGame = async () => {
    const playerO = await playerService.create('Player O')
    const playerX = await playerService.create('Player X')
    const game = await gameService.newGame({
      playerOId: playerO.id,
      playerXId: playerX.id,
    })
    setPlayerO(playerO)
    setPlayerX(playerX)
    setGameId(game.gameId)
    setGame(emptyGame)
    setStatus({
      status: 'playing',
      winner: null,
      victory: null,
      winners: [],
    })
  }

  const newMatch = () => {
    setGame(emptyGame)
    setStatus(old => ({
      ...old,
      status: 'playing',
      winner: null,
      victory: null,
    }))
  }

  return (
    <Container>
      <CenterBlock>
        <GameStatus status={status.status} currentPlayer={currentPlayer} winner={status.winner} />
        {(status.status !== 'waitingToStart') &&
          <Scoreboard winners={status.winners} />
        }
        <Game>
          {game.map((g, i) => (
            <Field
              onClick={() => click(i)}
              player={g === '' ? undefined : g}
              playerStatus={status.status === 'playerWin' && status.victory && status.victory[i] !== '' ? 'winner' : 'normal'} />
          ))}
        </Game>
        {(status.status === 'playerWin' || status.status === 'draw') &&
          <NewGameButton onClick={newMatch}>New game</NewGameButton>}
        {(status.status === 'waitingToStart') &&
          <StartGameButton onClick={startGame}>Start</StartGameButton>}
      </CenterBlock>
    </Container>
  );
}

export default TicTacToe
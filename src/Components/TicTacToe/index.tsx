import { useState } from "react";
import Field from "../Field";
import GameStatus from "../GameStatus";
import { BoardType } from "../../Types/BoardType";
import { GameStatusType } from "../../Types/GameStatusType";
import { PlayerType } from "../../Types/PlayerType";
import { ButtonContainer, CenterBlock, Container, Game, NewGameButton } from "./style";
import Scoreboard from "../Scoreboard";
import { checkWin } from "../../Helpers/checkWin";

type VictoryCells = [number, number, number]
type Status = {
  status: GameStatusType
  matchWinner: PlayerType | null
  winCells: VictoryCells | null
  winners: PlayerType[]
  currentPlayer: PlayerType
  initialPlayerOfMatch: PlayerType
}

const emptyGame: BoardType = [
  '', '', '',
  '', '', '',
  '', '', '',
]

function TicTacToe() {
  const [status, setStatus] = useState<Status>({
    status: 'playing',
    matchWinner: null,
    winCells: null,
    winners: [],
    currentPlayer: 'O',
    initialPlayerOfMatch: 'O',
  })
  const [game, setGame] = useState<BoardType>(emptyGame);

  const getNextPlayer = (player: PlayerType) => player === 'O' ? 'X' : 'O'

  const click = async (index: number) => {
    if (status.status === 'playing' && game[index] === '') {
      const newGame: BoardType = [...game]
      newGame[index] = status.currentPlayer

      const newStatus = { ...status }

      const winnerCheckResult = checkWin(newGame)
      if (winnerCheckResult.status === 'win') {
        newStatus.status = 'win'
        newStatus.matchWinner = winnerCheckResult.winner
        newStatus.winners.push(winnerCheckResult.winner)
        newStatus.winCells = winnerCheckResult.winCells
      } else if (winnerCheckResult.status === 'tie') {
        newStatus.status = 'tie'
      } else {
        newStatus.status = 'playing'
        newStatus.currentPlayer = getNextPlayer(status.currentPlayer)
      }

      setGame(newGame)
      setStatus(newStatus)
    }
  }

  const newMatch = () => {
    setGame(emptyGame)
    setStatus(old => ({
      ...old,
      status: 'playing',
      matchWinner: null,
      winCells: null,
      currentPlayer: getNextPlayer(old.initialPlayerOfMatch),
      initialPlayerOfMatch: getNextPlayer(old.initialPlayerOfMatch),
    }))
  }

  const ButtonChoice = () => {
    switch (status.status) {
      case 'win':
      case 'tie':
        return <NewGameButton onClick={newMatch}>New game</NewGameButton>
      default:
        return null;
    }
  }

  return (
    <Container>
      <CenterBlock>
        <GameStatus
          status={status.status}
          currentPlayer={status.currentPlayer}
          winner={status.matchWinner} />
        <Scoreboard winners={status.winners} />
        <Game>
          {game.map((g, i) => (
            <Field
              onClick={() => click(i)}
              player={g === '' ? undefined : g}
              playerStatus={(status.status === 'win')
                && status.winCells
                && status.winCells.includes(i) ? 'winner' : 'normal'}
            />
          ))}
        </Game>
        <ButtonContainer>
          <ButtonChoice />
        </ButtonContainer>
      </CenterBlock>
    </Container>
  );
}

export default TicTacToe
import { useState } from "react";
import gameService from "../../Services/gameService";
import playerService, { PlayerContract } from "../../Services/playerService";
import Field from "../Field";
import GameStatus from "../GameStatus";
import { GameStatusType } from "../Types/GameStatusType";
import { PlayerSymbol } from "../Types/PlayerSymbol";
import { CenterBlock, Container, Game, NewGameButton, StartGameButton } from "./style";

type Status = {
  status: GameStatusType
  winner: PlayerSymbol | null,
  victory: ('W' | ' ')[]
}

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSymbol>('O')
  const [playerO, setPlayerO] = useState<PlayerContract>()
  const [playerX, setPlayerX] = useState<PlayerContract>()
  const [gameId, setGameId] = useState<number>()
  const [status, setStatus] = useState<Status>({
    status: 'waitingToStart',
    winner: null,
    victory: [
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' ',
    ]
  })
  const [game, setGame] = useState<(PlayerSymbol | ' ')[]>([
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ]);
  const click = (index: number) => {
    if (status.status === 'playing') {
      if (game[index] === ' ') {
        const newGame = [...game]
        newGame[index] = currentPlayer
        setGame(newGame)
        setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O')
      }
    }
  }
  const startGame = async () => {
    const playerO = await playerService.create('Osmussen')
    const playerX = await playerService.create('Xedmond')
    const game = await gameService.newGame({
      player1Id: playerO.playerId,
      player2Id: playerX.playerId,
    })
    setPlayerO(playerO)
    setPlayerX(playerX)
    setGameId(game.gameId)
    setStatus({
      status: 'playing',
      winner: null,
      victory: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' ',
      ]
    })
  }
  const newGame = () => {
    setGame([
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' ',
    ])
    setStatus({
      status: 'playing',
      winner: null,
      victory: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' ',
      ]
    })
  }
  return (
    <Container>
      <CenterBlock>
        <GameStatus status={status.status} currentPlayer={currentPlayer} winner={status.winner} />
        <br />
        <Game>
          {game.map((g, i) => (
            <Field
              onClick={() => click(i)}
              player={g === ' ' ? undefined : g}
              playerStatus={status.status === 'playerWin' && status.victory[i] === 'W' ? 'winner' : 'normal'} />
          ))}
        </Game>
        <br />
        {(status.status === 'playerWin' || status.status === 'draw') &&
          <NewGameButton onClick={newGame}>New game</NewGameButton>}
        {(status.status === 'waitingToStart') &&
          <StartGameButton onClick={startGame}>Start</StartGameButton>}
        <div>
          gameid: {gameId} <br/>
          playerX: {playerX?.playerId} - {playerX?.name}<br/>
          playerO: {playerO?.playerId} - {playerO?.name}<br/>
        </div>
      </CenterBlock>
    </Container>
  );
}

export default TicTacToe
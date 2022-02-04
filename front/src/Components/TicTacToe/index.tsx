import { useState } from "react";
import Field from "../Field";
import Player from "../Player";
import { PlayerSymbol } from "../Types/PlayerSymbol";
import { CenterBlock, Container, CurrentPlayer, Game } from "./style";

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSymbol>('O')
  const [victory] = useState<('W' | ' ')[]>([
    'W', ' ', ' ',
    ' ', 'W', ' ',
    ' ', ' ', 'W',
  ]);
  const [game, setGame] = useState<(PlayerSymbol | ' ')[]>([
    'X', 'O', 'O',
    'O', 'X', 'X',
    'O', ' ', 'X',
  ]);
  const click = (index: number) => {
    if (game[index] === ' ') {
      const newGame = [...game]
      newGame[index] = currentPlayer
      setGame(newGame)
      setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O')
    }
  }
  return (
    <Container>
      <CenterBlock>
        <Game>
          {game.map((g, i) => (
            <Field 
              onClick={() => click(i)} 
              player={g === ' ' ? undefined : g} 
              playerStatus={victory[i] === 'W' ? 'winner' : 'normal'} />
          ))}
        </Game>
        <br />
        <CurrentPlayer>
          <p>Current Player:</p>
          <Player player={currentPlayer} />
        </CurrentPlayer>
      </CenterBlock>
    </Container>
  );
}

export default TicTacToe
import Player from "../Player";
import { GameStatusType } from "../Types/GameStatusType";
import { PlayerSymbol } from "../Types/PlayerSymbol";
import { Container } from "./style";

type Args = {
  status: GameStatusType
  currentPlayer: PlayerSymbol
  winner: PlayerSymbol | null
}

function GameStatus({ status, currentPlayer, winner }: Args) {
  return (
    <Container>
      {status === 'playing' && <>
        <p>Current Player:</p>
        <Player player={currentPlayer} />
      </>}
      
      {status === 'playerWin' && <>
        <p>Winner:</p>
        <Player player={winner!} />
      </>}
      
      {status === 'draw' && <>
        <p>Draw:</p>
        <Player player={'O'} />
        <Player player={'X'} />
      </>}
    </Container>
  );
}

export default GameStatus
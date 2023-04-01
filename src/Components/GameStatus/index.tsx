import { GameStatusType } from "../../Types/GameStatusType";
import { PlayerType } from "../../Types/PlayerType";
import { Container, StyledPlayer } from "./style";

type Args = {
  status: GameStatusType
  currentPlayer: PlayerType
  winner: PlayerType | null
}

function GameStatus({ status, currentPlayer, winner }: Args) {
  return (
    <Container>
      {status === 'playing' && <>
        <p>Current Player:</p>
        <StyledPlayer player={currentPlayer} />
      </>}
      
      {status === 'win' && <>
        <p>Winner:</p>
        <StyledPlayer player={winner!} />
      </>}
      
      {status === 'tie' && <>
        <p>Tie:</p>
        <StyledPlayer player='O' />
        <StyledPlayer player='X' />
      </>}
    </Container>
  );
}

export default GameStatus
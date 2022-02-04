import { Container, PlayerO, PlayerX } from "./style";
import { PlayerSymbol } from "./PlayerSymbol";

type Args = {
  player: PlayerSymbol
}
function Player({ player }: Args) {
  return (
    <Container>
      {player === 'O' 
        ? <PlayerO /> 
        : <PlayerX />}
    </Container>
  );
}

export default Player;
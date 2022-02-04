import { Container, PlayerO, PlayerX } from "./style";
import { PlayerSymbol } from "../Types/PlayerSymbol";
import { PlayerStatus } from "../Types/PlayerStatus";

type Args = {
  player: PlayerSymbol
  status?: PlayerStatus
}
function Player({ player, status = 'normal' }: Args) {
  return (
    <Container>
      {player === 'O' 
        ? <PlayerO status={status} /> 
        : <PlayerX status={status} />}
    </Container>
  );
}

export default Player;
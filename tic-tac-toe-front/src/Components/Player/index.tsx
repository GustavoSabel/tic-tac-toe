import { Container, PlayerO, PlayerX } from "./style";
import { PlayerType } from "../../Types/PlayerType";
import { PlayerStatus } from "../../Types/PlayerStatus";

type Args = {
  player: PlayerType
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
import { Container, PlayerO, PlayerX } from "./style";
import { PlayerType } from "../../Types/PlayerType";
import { PlayerStatus } from "../../Types/PlayerStatus";

type Args = {
  player: PlayerType
  status?: PlayerStatus
  className?: string
}
function Player({ player, status = 'normal', className }: Args) {
  return (
    <Container className={className}>
      {player === 'O' 
        ? <PlayerO status={status} /> 
        : <PlayerX status={status} />}
    </Container>
  );
}

export default Player;
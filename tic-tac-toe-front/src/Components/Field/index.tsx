import Player from "../Player";
import { PlayerStatus } from "../Types/PlayerStatus";
import { PlayerSymbol } from "../Types/PlayerSymbol";
import { Container } from "./style";

type Args = {
  player?: PlayerSymbol
  playerStatus: PlayerStatus
  onClick?: () => void
}

function Field(props: Args) {
  return (
    <Container onClick={props.onClick} status={props.playerStatus} player={props.player}>
       {props.player && <Player player={props.player} status={props.playerStatus} />}
    </Container>
  );
}

export default Field
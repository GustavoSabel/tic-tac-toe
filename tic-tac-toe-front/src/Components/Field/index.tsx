import Player from "../Player";
import { PlayerStatus } from "../../Types/PlayerStatus";
import { PlayerType } from "../../Types/PlayerType";
import { Container } from "./style";

type Args = {
  player?: PlayerType
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
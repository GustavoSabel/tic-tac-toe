import { PlayerStatus } from "../../Types/PlayerStatus";
import { PlayerType } from "../../Types/PlayerType";
import { Container, StyledPlayer } from "./style";

type Args = {
  player?: PlayerType
  playerStatus: PlayerStatus
  onClick?: () => void
  className?: string
}

function Field(props: Args) {
  return (
    <Container className={props.className} onClick={props.onClick} status={props.playerStatus} player={props.player}>
      {props.player && <StyledPlayer player={props.player} status={props.playerStatus} />}
    </Container>
  );
}

export default Field
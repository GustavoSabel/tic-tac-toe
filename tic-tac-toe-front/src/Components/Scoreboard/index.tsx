import { PlayerType } from "../../Types/PlayerType";
import { Container, Counter as StyledCounter, PlayerContainer, StyledPlayer } from "./style";

type Args = {
  winners: PlayerType[]
}

function Scoreboard(props: Args) {
  return (
    <Container>
      {
        (['O', 'X'] as PlayerType[]).map((player) => (
          <PlayerContainer>
            <StyledCounter>{props.winners.reduce((count, winner) => winner === player ? count + 1 : count, 0)}</StyledCounter> 
            <StyledPlayer player={player} />
          </PlayerContainer>
        ))
      }
    </Container>
  );
}

export default Scoreboard
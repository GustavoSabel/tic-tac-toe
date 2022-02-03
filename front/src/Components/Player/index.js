import { Container } from "./style";
import { ReactComponent as PlayerO } from '../../assets/playerO.svg';
import { ReactComponent as PlayerX } from '../../assets/playerX.svg';

function Player({ player }) {
  return (
    <Container>
      {player === 'O' ? <PlayerO/> : <PlayerX/>}
    </Container>
  );
}

export default Player;
import { Container } from "./style";
import { ReactComponent as PlayerOSvg } from '../../assets/playerO.svg';
import { ReactComponent as PlayerXSvg } from '../../assets/playerX.svg';

type Args = {
  player: 'X' | 'O'
}
function Player({ player }: Args) {
  return (
    <Container>
      {player === 'O' ? <PlayerOSvg /> : <PlayerXSvg />}
    </Container>
  );
}

export default Player;
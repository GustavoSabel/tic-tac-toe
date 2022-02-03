import { Container } from "./style";
import { ReactComponent as PlayerOSvg } from '../../assets/playerO.svg';
import { ReactComponent as PlayerXSvg } from '../../assets/playerX.svg';
import { PlayerSymbol } from "./PlayerSymbol";

type Args = {
  player: PlayerSymbol
}
function Player({ player }: Args) {
  return (
    <Container>
      {player === 'O' ? <PlayerOSvg /> : <PlayerXSvg />}
    </Container>
  );
}

export default Player;
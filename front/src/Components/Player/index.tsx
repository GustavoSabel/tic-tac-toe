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
      {player === 'O' 
        ? <PlayerOSvg style={{ color: '#f2b237' }} /> 
        : <PlayerXSvg style={{ color: '#2ec3bd' }} />}
    </Container>
  );
}

export default Player;
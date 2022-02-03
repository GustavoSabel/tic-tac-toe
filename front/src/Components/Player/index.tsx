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
const PlayerX = () => Player({ player: 'X' })
const PlayerO = () => Player({ player: 'O' })

export { PlayerX, PlayerO };
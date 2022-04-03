import styled from 'styled-components';
import { ReactComponent as PlayerOSvg } from '../../assets/playerO.svg';
import { ReactComponent as PlayerXSvg } from '../../assets/playerX.svg';
import { styleColors } from '../../styles/styleColors';
import { PlayerStatus } from '../../Types/PlayerStatus';

export const Container = styled.div`
  width: 50px;
  height: 50px;
`;

type PlayerProps = {
  status: PlayerStatus
}
export const PlayerO = styled(PlayerOSvg)<PlayerProps>`
  color: ${props => props.status === 'normal' ? styleColors.yellow : styleColors.field };
`;

export const PlayerX = styled(PlayerXSvg)<PlayerProps>`
  color: ${props => props.status === 'normal' ? styleColors.blue : styleColors.field };
`;
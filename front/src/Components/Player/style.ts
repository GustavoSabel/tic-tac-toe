import styled from 'styled-components';
import { ReactComponent as PlayerOSvg } from '../../assets/playerO.svg';
import { ReactComponent as PlayerXSvg } from '../../assets/playerX.svg';
import { styleColors } from '../../assets/styleColors';

export const Container = styled.div`
  width: 50px;
  height: 50px;
`;

export const PlayerO = styled(PlayerOSvg)`
  color: ${styleColors.yellow}
`;

export const PlayerX = styled(PlayerXSvg)`
  color: ${styleColors.blue}
`;
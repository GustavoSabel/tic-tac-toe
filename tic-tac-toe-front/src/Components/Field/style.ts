import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';
import { PlayerStatus } from '../../Types/PlayerStatus';
import { PlayerType } from '../../Types/PlayerType';
import Player from '../Player';

type PlayerProps = {
  status: PlayerStatus
  player?: PlayerType
}
export const Container = styled.div<PlayerProps>`
  width: 90px;
  height: 90px;
  background-color: ${props => props.status === 'normal' ? styleColors.field : (props.player === 'O' ? styleColors.yellow : styleColors.blue)};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;


export const StyledPlayer = styled(Player)`
  max-width: 50px;
  max-height: 50px;
`
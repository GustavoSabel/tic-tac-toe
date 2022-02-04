import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';
import { PlayerStatus } from '../Types/PlayerStatus';
import { PlayerSymbol } from '../Types/PlayerSymbol';

type PlayerProps = {
  status: PlayerStatus
  player?: PlayerSymbol
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

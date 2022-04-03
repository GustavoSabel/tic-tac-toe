import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';
import Player from "../Player";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;


export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Counter = styled.p`
  font-size: 38px;
  color: ${styleColors.white};
  word-spacing: 0;
  margin-top: 1px;
  margin-right: 4px;
`

export const StyledPlayer = styled(Player)`
  width: 30px;
  height: 30px;
`
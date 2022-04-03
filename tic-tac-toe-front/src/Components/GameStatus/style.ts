import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';
import Player from '../Player';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: flex-end;
  height: 50px;
  p {
    color: ${styleColors.white};
    font-size: 40px;
    line-height: 30px;
  }
`;


export const StyledPlayer = styled(Player)`
  width: 50px;
  height: 50px;
`
import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';
import Player from '../Player';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  p {
    color: ${styleColors.white};
    margin-bottom: 10px;
    font-size: 40px;
  }
`;


export const StyledPlayer = styled(Player)`
  width: 50px;
  height: 50px;
`
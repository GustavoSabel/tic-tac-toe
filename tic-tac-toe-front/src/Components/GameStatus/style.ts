import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';

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

import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';

export const Container = styled.div`
  width: 90px;
  height: 90px;
  background-color: ${styleColors.field};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

import styled from 'styled-components';
import { styleColors } from '../../styles/styleColors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Game = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: ${styleColors.white};
  border-style: none;
  font-size: 40px;
  padding: 10px 30px;
  border-radius: 4px;
`;

export const NewGameButton = styled(Button)`
  background-color: ${styleColors.yellow};
`;

export const StartGameButton = styled(Button)`
  background-color: ${styleColors.blue};
`;
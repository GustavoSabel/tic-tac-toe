import styled from 'styled-components';

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

export const CurrentPlayer = styled.div`
  color: white;
  float: right;
`;
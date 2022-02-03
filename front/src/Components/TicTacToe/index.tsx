import Field from "../Field";
import Player from "../Player";
import { Container, Game } from "./style";

function TicTacToe() {
  return (
    <Container>
      <Game>
        <Field><Player player='O'/></Field>
        <Field></Field>
        <Field><Player player='X'/></Field>
        <Field></Field>
        <Field></Field>
        <Field><Player player='X'/></Field>
        <Field></Field>
        <Field><Player player='O'/></Field>
        <Field></Field>
      </Game>
    </Container>
  );
}

export default TicTacToe
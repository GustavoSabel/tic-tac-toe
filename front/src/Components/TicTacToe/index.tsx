import Field from "../Field";
import { Container, Game } from "./style";

function TicTacToe() {
  return (
    <Container>
      <Game>
        <Field>X</Field>
        <Field></Field>
        <Field>X</Field>
        <Field></Field>
        <Field></Field>
        <Field>O</Field>
        <Field></Field>
        <Field>O</Field>
        <Field></Field>
      </Game>
    </Container>
  );
}

export default TicTacToe
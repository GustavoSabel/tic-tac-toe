import Field from "../Field";
import { PlayerO, PlayerX } from "../Player";
import { Container, Game } from "./style";

function TicTacToe() {
  return (
    <Container>
      <Game>
        <Field><PlayerX /></Field>
        <Field></Field>
        <Field><PlayerX /></Field>
        <Field></Field>
        <Field></Field>
        <Field><PlayerO /></Field>
        <Field></Field>
        <Field><PlayerO /></Field>
        <Field></Field>
      </Game>
    </Container>
  );
}

export default TicTacToe
import { Container } from "./style";

type Args = {
  children?: any
  onClick?: () => void
}

function Field(props: Args) {
  return (
    <Container onClick={props.onClick}>
      {props.children}
    </Container>
  );
}

export default Field
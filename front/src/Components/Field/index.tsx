import { Container } from "./style";

type Args = {
  children?: any
}

function Field(props: Args) {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

export default Field
import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

const Wrapper = styled.section`
  flex: 1;
`;

export default function Layout(props) {
  return (
    <Wrapper>
      <Container>{props.children}</Container>
    </Wrapper>
  );
}

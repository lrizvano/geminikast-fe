import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

const Style = styled.hr`
  background-color: var(--primary);
`;

export default function Line(props) {
  return <Style>{props.children}</Style>;
}

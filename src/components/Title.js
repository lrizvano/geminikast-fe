import React from "react";
import styled from "styled-components";

const Style = styled.h1`
  margin-top: 1rem;
  color: var(--primary);
`;

export default function Title(props) {
  return <Style>{props.children}</Style>;
}

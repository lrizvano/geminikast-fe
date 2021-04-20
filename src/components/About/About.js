import React from "react";
import AuthorList from "./AuthorList.js";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 1rem;
  color: var(--primary);
`;

export default function Articles() {
  return (
    <>
      <Title>Kast</Title>
      <AuthorList />
    </>
  );
}

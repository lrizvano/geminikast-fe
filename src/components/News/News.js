import React from "react";
import ArticleList from "./ArticleList.js";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 1rem;
  color: var(--primary);
`;

export default function Articles() {
  return (
    <>
      <Title>News</Title>
      <ArticleList />
    </>
  );
}

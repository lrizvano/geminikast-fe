import React from "react";
import ReviewList from "./ReviewList.js";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 1rem;
  color: var(--primary);
`;

export default function Articles() {
  return (
    <>
      <Title>Reviews</Title>
      <ReviewList />
    </>
  );
}

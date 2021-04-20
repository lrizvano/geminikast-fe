import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 1rem;
  color: var(--primary);
`;

export default function Home() {
  return (
    <>
      <Title>Features</Title>
      <Features />

      <Title>Newest Episode</Title>
      <Podcast />
    </>
  );
}

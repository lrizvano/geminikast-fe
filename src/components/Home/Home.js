import React from "react";
import Podcast from "./Podcast.js";
import Featured from "./Featured.js";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 1rem;
  color: var(--primary);
`;

export default function Home() {
  return (
    <>
      <Title>Recent Updates</Title>
      <Featured />

      <Title>Newest Episode</Title>
      <Podcast />
    </>
  );
}

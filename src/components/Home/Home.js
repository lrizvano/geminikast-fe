import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import styled from "styled-components";
import Title from "../Title.js";

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

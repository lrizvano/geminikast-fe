import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Home() {
  return (
    <>
      <Jumbotron className="mt-3 mb-0 bg-primary text-dark">
        <h1>The Geminikast</h1>
        <h2 className="text-muted">Games, Tech, and Movie Discussions!</h2>
      </Jumbotron>
      <hr className="bg-primary m-3" />
      <Features />
      <hr className="bg-primary m-3" />
      <Podcast />
    </>
  );
}

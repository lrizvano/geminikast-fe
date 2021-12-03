import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Home() {
  return (
    <>
      <Jumbotron className="mt-3 bg-primary text-dark">
        <h1>The Geminikast</h1>
        <h2 className="text-muted">Games, Tech, and Movie Discussions!</h2>
      </Jumbotron>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <Features className="ml-3 mr-3" />
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <Podcast />
    </>
  );
}

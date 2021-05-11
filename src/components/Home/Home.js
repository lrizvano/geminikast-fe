import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Home() {
  return (
    <>
      <Jumbotron className="mt-3 mb-0 bg-primary text-dark">
        <h1>Welcome to the Geminikast!</h1>
        <h2 className="text-muted">Check out our newest content.</h2>
      </Jumbotron>
      <hr className="bg-primary" />
      <Features />
      <hr className="bg-primary" />
      <Podcast />
    </>
  );
}

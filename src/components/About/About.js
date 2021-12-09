import React from "react";
import AuthorList from "./AuthorList.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function About() {
  return (
    <>
      <Jumbotron className="mt-3 bg-primary text-dark">
        <h1>The Geminikast</h1>
        <h2 className="text-muted">Games, Tech, and Movie Discussions!</h2>
      </Jumbotron>
      <h1 className="mt-3 text-primary">Kast</h1>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <AuthorList />
    </>
  );
}

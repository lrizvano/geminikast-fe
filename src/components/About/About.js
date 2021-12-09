import React from "react";
import AuthorList from "./AuthorList.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function About() {
  return (
    <>
      <Jumbotron className="mt-5 bg-secondary text-light">
        <h1 className="font-weight-bold">The Geminikast</h1>
        <h2>Games, Tech, and Movie Discussions!</h2>
      </Jumbotron>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <AuthorList />
    </>
  );
}

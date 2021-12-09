import React from "react";
import ReviewList from "./ReviewList.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Reviews() {
  return (
    <>
      <Jumbotron className="mt-5 bg-secondary text-light">
        <h1 className="font-weight-bold">The Geminikast</h1>
        <h2>Games, Tech, and Movie Discussions!</h2>
      </Jumbotron>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <ReviewList />
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
    </>
  );
}

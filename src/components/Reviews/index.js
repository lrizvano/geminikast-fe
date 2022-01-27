import React from "react";
import ContentList from "../ContentList.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Reviews() {
  return (
    <>
      <Jumbotron className="mt-3 bg-secondary text-info">
        <h1 className="font-weight-bold">The Geminikast's Reviews</h1>
        <h2>
          Check out all of our reviews and impressions of the latest games,
          movies, shows, and more!
        </h2>
      </Jumbotron>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <ContentList type="review" />
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
    </>
  );
}

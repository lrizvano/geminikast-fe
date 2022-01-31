import React from "react";
import DocumentList from "../templates/DocumentList.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Divider from "../common/Divider.js";

export default function Reviews() {
  return (
    <>
      <Jumbotron className="bg-secondary text-info">
        <h1 className="font-weight-bold">The Geminikast's Reviews</h1>
        <h2>
          Check out all of our reviews and impressions of the latest games,
          movies, shows, and more!
        </h2>
      </Jumbotron>
      <Divider />
      <DocumentList type="review" />
      <Divider />
    </>
  );
}

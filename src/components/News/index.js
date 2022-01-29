import React from "react";
import ContentList from "../templates/DocumentList.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Divider from "../common/Divider.js";

export default function News() {
  return (
    <>
      <Jumbotron className="bg-secondary text-info">
        <h1 className="font-weight-bold">The Geminikast's News</h1>
        <h2>
          See what's new surrounding the video game and entertainment world!
        </h2>
      </Jumbotron>
      <Divider />
      <ContentList type="article" />
      <Divider />
    </>
  );
}

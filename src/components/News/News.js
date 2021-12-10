import React from "react";
import ArticleList from "./ArticleList.js";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function News() {
  return (
    <>
      <Jumbotron className="mt-3 bg-secondary text-light">
        <h1 className="font-weight-bold">The Geminikast</h1>
        <h2>Games, Tech, and Movie Discussions!</h2>
      </Jumbotron>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <ArticleList />
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
    </>
  );
}

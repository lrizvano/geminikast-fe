import React from "react";
import AuthorList from "./AuthorList.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Divider from "../common/Divider.js";

export default function About() {
  return (
    <>
      <Jumbotron className="bg-secondary text-info">
        <h1 className="font-weight-bold">The Geminikast</h1>
        <h2>Games, Tech, and Movie Discussions</h2>
      </Jumbotron>
      <AuthorList />
      <Divider />
    </>
  );
}

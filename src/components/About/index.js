import React from "react";
import AuthorList from "./AuthorList.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Divider from "../common/Divider.js";

export default function About() {
  return (
    <>
      <Jumbotron className="bg-secondary text-info">
        <h1 className="font-weight-bold">The Geminikast</h1>
        <h2>Meet our incredible staff!</h2>
      </Jumbotron>
      <Divider />
      <AuthorList />
      <Divider />
    </>
  );
}

import React from "react";
import AuthorList from "./AuthorList.js";

export default function About() {
  return (
    <>
      <h1 className="mt-3 text-primary">Kast</h1>
      <hr className="bg-primary m-3" />
      <AuthorList />
    </>
  );
}

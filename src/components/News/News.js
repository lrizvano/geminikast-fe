import React from "react";
import ArticleList from "./ArticleList.js";

export default function News() {
  return (
    <>
      <h1 className="mt-3 text-primary">News</h1>
      <hr className="bg-primary m-3" />
      <ArticleList />
    </>
  );
}

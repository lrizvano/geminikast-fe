import React from "react";
import ArticleList from "./ArticleList.js";

export default function News() {
  return (
    <>
      <h1 className="mt-3 text-primary">News</h1>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <ArticleList />
    </>
  );
}

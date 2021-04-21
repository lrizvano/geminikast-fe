import React from "react";
import ArticleList from "./ArticleList.js";
import styled from "styled-components";
import Title from "../Title.js";

export default function Articles() {
  return (
    <>
      <Title>News</Title>
      <ArticleList />
    </>
  );
}

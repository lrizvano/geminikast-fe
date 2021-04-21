import React from "react";
import AuthorList from "./AuthorList.js";
import styled from "styled-components";
import Title from "../Title.js";

export default function Articles() {
  return (
    <>
      <Title>Kast</Title>
      <AuthorList />
    </>
  );
}

import React from "react";
import { RichText } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";

export default function ReviewBody(props) {
  return (
    <>
      <RichText
        render={props.body}
        htmlSerializer={client.htmlSerializer}
      ></RichText>
    </>
  );
}
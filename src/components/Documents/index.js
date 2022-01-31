import React from "react";
import DocumentList from "./DocumentList.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Divider from "../common/Divider.js";
import { documentTypes } from "../../utils/queries";

export default function Documents(props) {
  return (
    <>
      <Jumbotron className="bg-secondary text-info">
        <h1 className="font-weight-bold">
          The Geminikast's {documentTypes[props.type].name}
        </h1>
        <h2>{documentTypes[props.type].description}</h2>
      </Jumbotron>
      <Divider />
      <DocumentList type={props.type} />
      <Divider />
    </>
  );
}

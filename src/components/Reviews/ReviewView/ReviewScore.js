import React from "react";
import Badge from "react-bootstrap/Badge";

export default function ReviewScore(props) {
  return (
    <>
      <h1>
        <Badge variant="secondary">{props.score / 10}</Badge>
      </h1>
    </>
  );
}

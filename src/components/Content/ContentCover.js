import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import DateFormat from "../DateFormat.js";

export default function ArticleCover(props) {
  const populateFields = () => {
    switch (props.type) {
      case "article":
        return {
          title: props.headline,
        };
      default:
        return {
          title: props.game,
        };
    }
  };

  return (
    <>
      <Image fluid src={props.image} />
      <h1 className="mt-3 text-primary">{props.headline}</h1>
      {"By "}
      <Link replace to={`/author/${props.uid}`}>
        {props.name}
      </Link>
      <br />
      <small className="text-muted">
        <DateFormat date={props.date} />
      </small>
    </>
  );
}

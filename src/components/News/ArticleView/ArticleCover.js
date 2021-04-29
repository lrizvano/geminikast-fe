import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import DateFormat from "../../DateFormat.js";

export default function ArticleCover(props) {
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

import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import DateFormat from "../../DateFormat.js";

export default function ReviewCover(props) {
  return (
    <>
      <Image fluid src={props.image} />
      <h1 className="mt-3 text-primary">{props.game} Review</h1>
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

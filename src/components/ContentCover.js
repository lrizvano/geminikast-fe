import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import DateFormat from "./DateFormat.js";

export default function ArticleCover(props) {
  return (
    <>
      <Image className="mt-3" fluid src={props.image} />
      <h1 className="mt-3 text-primary">{props.title}</h1>
      <Link replace to={`/author/${props.uid}`} className="text-white">
        {props.name}
      </Link>
      <br />
      <small className="text-muted">
        <DateFormat date={props.date} />
      </small>
    </>
  );
}
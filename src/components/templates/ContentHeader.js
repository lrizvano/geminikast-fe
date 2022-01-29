import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { formatDate } from "../../utils/formatters.js";

export default function ContentHeader(props) {
  return (
    <>
      <Image className="mt-3" fluid src={props.image} />
      <h1 className="mt-3 text-primary">{props.title}</h1>
      <Link replace to={`/author/${props.uid}`} className="text-white">
        {props.name}
      </Link>
      <br />
      <small className="text-muted">{formatDate(props.date)}</small>
    </>
  );
}

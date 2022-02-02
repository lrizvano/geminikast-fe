import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

export default function DocumentHeader(props) {
  return (
    <>
      <h1 className="text-info font-weight-bold mb-3">{props.title}</h1>
      <Image fluid src={props.image} className="mb-3" />
      <Link replace to={`/author/${props.uid}`} className="text-primary">
        {props.name}
      </Link>
      <br />
      <small className="text-muted">{props.date}</small>
    </>
  );
}

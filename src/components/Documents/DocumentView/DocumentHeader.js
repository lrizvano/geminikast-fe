import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

export default function DocumentHeader(props) {
  return (
    <>
      <Image fluid src={props.image} className="mb-3" />
      <h1 className="text-primary">{props.title}</h1>
      <Link replace to={`/author/${props.uid}`} className="text-white">
        {props.name}
      </Link>
      <br />
      <small className="text-muted">{props.date}</small>
    </>
  );
}

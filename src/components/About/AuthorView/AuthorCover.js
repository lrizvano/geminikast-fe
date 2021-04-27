import React from "react";
import Image from "react-bootstrap/Image";
import Title from "../../Title.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ArticleCover(props) {
  return (
    <>
      <Row>
        <Col xs="auto">
          <Image fluid src={props.image} />
        </Col>
        <Col xs="auto">
          <Title>{props.name}</Title>
          <small className="text-muted">{props.role}</small>
        </Col>
      </Row>
    </>
  );
}

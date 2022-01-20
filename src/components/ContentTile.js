import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Hover from "./Hover";

export default function ContentColumn(props) {
  return (
    <Col xs="6" md="4">
      <Hover>
        <Card className="mb-4">
          <Card.Link href={props.link}>
            <Card.Img src={props.image} />
            <Card.Body className="text-light">
              <Card.Title className="font-weight-bold">
                {props.title}
              </Card.Title>
              <Card.Subtitle className="mb-2">{props.text}</Card.Subtitle>
            </Card.Body>
          </Card.Link>
        </Card>
      </Hover>
    </Col>
  );
}

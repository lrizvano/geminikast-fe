import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import CardHover from "./styled/CardHover";

export default function ContentColumn(props) {
  return (
    <Col xs="6" md="4">
      <CardHover>
        <Card className="mb-4">
          <Card.Link href={props.link}>
            <Card.Img src={props.image} />
            <Card.Body className="text-info">
              <Card.Title className="font-weight-bold">
                {props.title}
              </Card.Title>
              <Card.Subtitle className="mb-2">{props.text}</Card.Subtitle>
            </Card.Body>
          </Card.Link>
        </Card>
      </CardHover>
    </Col>
  );
}

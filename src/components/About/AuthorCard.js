import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import CardHover from "../styled/CardHover.js";

export default function AuthorCard(props) {
  return (
    <Col xs="6" lg="3">
      <CardHover>
        <Card className="mb-4">
          <Card.Link href={`author/${props.uid}`}>
            <Card.Img id="profile" src={props.image} />
            <Card.Body className="text-info text-center">
              <Card.Title className="font-weight-bold">{props.name}</Card.Title>
              <Card.Subtitle className="mb-2">{props.role}</Card.Subtitle>
            </Card.Body>
          </Card.Link>
        </Card>
      </CardHover>
    </Col>
  );
}

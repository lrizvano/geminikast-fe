import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function ArticleCard(props) {
  return (
    <Col xs="12" sm="12" md="6" lg="4" xl="4">
      <Card bg="primary" className="mb-4">
        <Card.Link href={`news/${props.uid}`} className="text-dark">
          <Card.Img variant="top" src={props.image} />
          <Card.Body>
            <Card.Title>{props.headline}</Card.Title>
            <small className="text-muted">By {props.author}</small>
          </Card.Body>
        </Card.Link>
      </Card>
    </Col>
  );
}

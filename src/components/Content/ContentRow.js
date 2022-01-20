import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Hover from "../Hover";

export default function ContentCard(props) {
  return (
    <Hover>
      <Card className="mb-3">
        <Card.Link href={props.link}>
          <Row>
            <Col xs="6" md="4" lg="3">
              <Card.Img src={props.image} />
            </Col>
            <Col xs="6">
              <Card.Body>
                <Card.Title className="font-weight-bold">
                  {props.title}
                </Card.Title>
                <Card.Subtitle className="mb-2">
                  {props.author}{" "}
                  {props.link.startsWith("news")
                    ? "reported on"
                    : "reviewed on"}{" "}
                  {props.date}
                </Card.Subtitle>
              </Card.Body>
            </Col>
          </Row>
        </Card.Link>
      </Card>
    </Hover>
  );
}

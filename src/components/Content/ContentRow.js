import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Row from "react-bootstrap/Row";

const Hover = styled.section`
  .card {
    border-color: var(--dark);
    background-color: var(--dark);
    transition: border-color 500ms ease, background-color 500ms ease;
  }
  .card-body {
    color: white;
  }

  &:hover,
  &:focus-within {
    .card {
      border-color: var(--secondary);
      background-color: var(--secondary);
    }
  }
`;

export default function ContentCard(props) {
  return (
    <Hover>
      <Card className="mb-3">
        <Card.Link href={props.link}>
          <Row>
            <Col xs="6" sm="4">
              <Card.Img variant="top" src={props.image} />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title className="font-weight-bold">
                  {props.title}
                </Card.Title>
                <Card.Subtitle className="mb-2">
                  {props.author} reviewed on {props.date}
                </Card.Subtitle>
              </Card.Body>
            </Col>
          </Row>
        </Card.Link>
      </Card>
    </Hover>
  );
}

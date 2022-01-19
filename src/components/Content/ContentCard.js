import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Hover = styled.section`
  .card {
    border-color: var(--dark);
    background-color: var(--dark);
    transition: border-color 500ms ease, background-color 500ms ease;
  }
  .card-body {
    color: white;
  }
  .card-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover,
  &:focus-within {
    .card {
      border-color: var(--secondary);
      background-color: var(--secondary);
    }
    .card-title {
      white-space: normal;
    }
  }

  @media only screen and (max-width: 900px) {
    .card-title {
      white-space: normal;
    }
  }
`;

export default function ContentCard(props) {
  return (
    <Col xs="12" sm="12" md="6" lg="4" xl="4">
      <Hover>
        <Card className="mb-4">
          <Card.Link href={props.link}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
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

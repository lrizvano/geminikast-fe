import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Hover = styled.section`
  #card {
    border-color: var(--dark);
    background-color: var(--dark);
    transition: border-color 500ms ease, background-color 500ms ease;
    #picture {
      border-radius: 50%;
      transition: border-radius 500ms ease;
    }
    #text {
      color: white;
      text-align: center;
      overflow: hidden;
    }
  }

  &:hover,
  &:focus-within {
    #card {
      border-color: var(--secondary);
      background-color: var(--secondary);
      #picture {
        border-radius: 0%;
      }
    }
  }
`;

export default function AuthorCard(props) {
  return (
    <Col xs="6" sm="6" md="4" lg="3" xl="3">
      <Hover>
        <Card id="card" className="mb-4">
          <Card.Link href={`author/${props.uid}`}>
            <Card.Img id="picture" variant="top" src={props.image} />
            <Card.Body id="text">
              <Card.Title className="font-weight-bold">{props.name}</Card.Title>
              <small>{props.role}</small>
            </Card.Body>
          </Card.Link>
        </Card>
      </Hover>
    </Col>
  );
}
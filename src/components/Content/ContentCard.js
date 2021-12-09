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

export default function ContentCard(props) {
  return (
    <Col xs="12" sm="12" md="6" lg="4" xl="4">
      <Hover>
        <Card id="card" className="mb-4">
          <Card.Link href={props.link}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body id="text">
              <Card.Title className="font-weight-bold">
                {props.title}
              </Card.Title>
              <small>{props.text}</small>
            </Card.Body>
          </Card.Link>
        </Card>
      </Hover>
    </Col>
  );
}

import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Hover = styled.section`
  #card {
    position: relative;
    overflow: hidden;
    border-color: var(--dark);
    #text {
      position: absolute;
      bottom: 0px;
      color: var(--light);
      width: 100%;
      background: linear-gradient(hsl(0 0% 0% / 0), hsl(0 0% 0% / 1));
    }

    @media (hover) {
      #text {
        transform: translateY(35%);
        transition: transform 500ms ease;
      }
      &:hover,
      &:focus-within {
        border-color: var(--primary);
        #text {
          color: var(--primary);
          transform: translateY(0%);
        }
      }
    }
  }
`;

export default function ArticleCard(props) {
  return (
    <Col xs="12" sm="12" md="6" lg="4" xl="4">
      <Hover>
        <Card id="card" className="mb-4">
          <Card.Link href={`reviews/${props.uid}`}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body id="text">
              <Card.Title>{props.headline}</Card.Title>
              <small className="text-muted">By {props.author}</small>
            </Card.Body>
          </Card.Link>
        </Card>
      </Hover>
    </Col>
  );
}

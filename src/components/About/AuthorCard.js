import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Hover = styled.section`
  #content {
    #card {
      border-color: var(--dark);
      background-color: var(--dark);
    }
    #picture {
      border-radius: 50%;
    }
    #text {
      color: white;
      text-align: center;
      overflow: hidden;
    }

    &:hover, &:focus-within {
      #card {
        border-color: var(--primary);
        background-color: var(--primary);
      }
      #picture {
        border-radius: 0%;
      }
      #text {
        color: var(--dark);
      }
    }
`;

export default function AuthorCard(props) {
  return (
    <Col xs="6" sm="6" md="4" lg="3" xl="3">
      <Hover>
        <div id="content">
          <Card id="card" className="mb-4">
            <Card.Link href={`author/${props.uid}`}>
              <Card.Img id="picture" variant="top" src={props.image} />
              <Card.Body id="text">
                <Card.Title>{props.name}</Card.Title>
                <small className="text-muted">{props.role}</small>
              </Card.Body>
            </Card.Link>
          </Card>
        </div>
      </Hover>
    </Col>
  );
}

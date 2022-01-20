import React from "react";
import { RichText } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Score = styled.section`
  .card {
    margin: 3rem 3rem 0 3rem;
  }
  h2 {
    position: absolute;
    top: 0;
    left: 2%;
    color: var(--light);
    background-color: var(--dark);
    padding-bottom: 0.5em;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
  }
`;

export default function ReviewBody(props) {
  return (
    <>
      <RichText
        render={props.body}
        htmlSerializer={client.htmlSerializer}
      ></RichText>
      <Score className="mt-3">
        <Card className="bg-secondary text-light p-3 mb-3 font-weight-bold">
          <Row>
            <Col md={{ span: 11, offset: 1 }} xs={{ span: 10, offset: 2 }}>
              {props.summary}
            </Col>
            <h2>
              <Badge>{props.score / 10}</Badge>
            </h2>
          </Row>
        </Card>
      </Score>
    </>
  );
}

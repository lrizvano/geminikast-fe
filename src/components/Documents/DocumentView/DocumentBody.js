import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { documentTypes } from "../../../utils/queries.js";

const Score = styled.section`
  .card {
    margin: 3rem 3rem 0 3rem;
  }
  h2 {
    position: absolute;
    top: 0;
    left: 0.5em;
    background-color: var(--dark);
    padding-bottom: 1em;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
  }
`;

export default function DocumentBody(props) {
  return (
    <>
      <p>{props.body}</p>
      {props.type === Object.keys(documentTypes)[1] && (
        <Score>
          <Card className="bg-secondary text-info p-3 mb-3 font-weight-bold">
            <Row>
              <Col lg={{ span: 11, offset: 1 }} xs={{ span: 10, offset: 2 }}>
                {props.summary}
              </Col>
              <h2>
                <Badge>{props.score / 10}</Badge>
              </h2>
            </Row>
          </Card>
        </Score>
      )}
    </>
  );
}

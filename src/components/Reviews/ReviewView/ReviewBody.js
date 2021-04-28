import React from "react";
import { RichText } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ReviewBody(props) {
  return (
    <>
      <RichText
        render={props.body}
        htmlSerializer={client.htmlSerializer}
      ></RichText>
      <Card className="bg-primary text-dark p-3 mb-3">
        <Row>
          <Col xs="auto">
            <h1>
              <Badge variant="secondary">{props.score / 10}</Badge>
            </h1>
          </Col>
          <Col>{props.summary}</Col>
        </Row>
      </Card>
    </>
  );
}

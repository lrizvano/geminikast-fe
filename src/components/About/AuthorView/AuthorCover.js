import React from "react";
import { RichText } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function ArticleCover(props) {
  return (
    <>
      <Row className="mb-3">
        <Col xs="auto">
          <Image src={props.image} />
        </Col>
        <Wrapper>
          <Col xs="auto">
            <h1 className="mt-3 text-primary">{props.name}</h1>
            <small className="text-muted">{props.role}</small>
          </Col>
        </Wrapper>
      </Row>
      <RichText
        render={props.bio}
        htmlSerializer={client.htmlSerializer}
      ></RichText>
    </>
  );
}

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
      <Row className="mt-3 ml-3">
        <Col xs="auto">
          <Image src={props.image} roundedCircle />
        </Col>
        <Col xs="6" lg="8">
          <Wrapper>
            <h1 className="mt-3 text-primary">{props.name}</h1>
            <small className="text-muted">{props.role}</small>
            <RichText
              render={props.bio}
              htmlSerializer={client.htmlSerializer}
            ></RichText>
          </Wrapper>
        </Col>
      </Row>
    </>
  );
}

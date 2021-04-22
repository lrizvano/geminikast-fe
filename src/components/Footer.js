import React from "react";
import { SocialIcon } from "react-social-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "./Layout.js";
import styled from "styled-components";

const links = [
  "https://twitter.com/geminikatz",
  "https://open.spotify.com/show/77QfKMGg067YXiJnb1Ic3q",
  "https://www.youtube.com/channel/UCG6B9yuk_K4MITArK719LUw",
  "https://www.instagram.com/thegeminikast",
  "https://www.twitch.tv/geminikatz",
];

const Wrapper = styled.section`
  background-color: var(--secondary);
  position: "relative";
  bottom: 0;
  height: 4rem;
  display: flex;
  align-items: center;
`;

export default function Footer() {
  const renderLinks = () => {
    return links.map((link) => (
      <Col xs="auto" key={link}>
        <SocialIcon url={link} />
      </Col>
    ));
  };

  return (
    <Wrapper>
      <Layout>
        <Row className="justify-content-center">{renderLinks()}</Row>
      </Layout>
    </Wrapper>
  );
}

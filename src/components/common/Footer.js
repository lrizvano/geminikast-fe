import React from "react";
import { SocialIcon } from "react-social-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "./Layout.js";
import styled from "styled-components";
import Brand from "./Brand";

const links = [
  "https://twitter.com/geminikatz",
  "https://open.spotify.com/show/77QfKMGg067YXiJnb1Ic3q",
  "https://www.youtube.com/channel/UCG6B9yuk_K4MITArK719LUw",
  "https://www.instagram.com/thegeminikast",
  "https://www.twitch.tv/geminikatz",
];

const Wrapper = styled.section`
  position: "relative";
  bottom: 0;
  height: 10rem;
  display: flex;
  align-items: center;
  background-color: var(--secondary);
`;

export default function Footer() {
  const renderLinks = () => {
    return links.map((link) => (
      <Col xs="auto" key={link}>
        <SocialIcon
          url={link}
          fgColor="var(--dark)"
          style={{ height: 40, width: 40 }}
        />
      </Col>
    ));
  };

  return (
    <Wrapper>
      <Layout>
        <Row className="justify-content-center mb-3">
          <Brand />
        </Row>
        <Row className="justify-content-center">{renderLinks()}</Row>
      </Layout>
    </Wrapper>
  );
}

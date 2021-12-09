import React from "react";
import { SocialIcon } from "react-social-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "./Layout.js";
import styled from "styled-components";
import logo from "../geminikast-logo.png";
import Navbar from "react-bootstrap/Navbar";

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
        <SocialIcon url={link} fgColor="var(--dark)" />
      </Col>
    ));
  };

  return (
    <Wrapper>
      <Layout>
        <Row className="justify-content-center">
          <Navbar.Brand href="/" className="text-light">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top mb-3"
            />{" "}
            The Geminikast
          </Navbar.Brand>
        </Row>
        <Row className="justify-content-center">{renderLinks()}</Row>
      </Layout>
    </Wrapper>
  );
}

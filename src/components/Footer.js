import React from "react";
import { SocialIcon } from "react-social-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "./Layout.js";

const links = [
  "https://twitter.com/geminikatz",
  "https://open.spotify.com/show/77QfKMGg067YXiJnb1Ic3q",
  "https://www.youtube.com/channel/UCG6B9yuk_K4MITArK719LUw",
  "https://www.instagram.com/thegeminikast",
  "https://www.twitch.tv/geminikatz",
];

export default function Footer() {
  const renderLinks = () => {
    return links.map((link) => (
      <Col xs={2} lg={1}>
        <SocialIcon url={`${link}`} />
      </Col>
    ));
  };

  return (
    <div className="Footer">
      <Layout>
        <Row className="justify-content-center">{renderLinks()}</Row>
      </Layout>
    </div>
  );
}

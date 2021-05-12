import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Podcast() {
  return (
    <>
      <Row>
        <Col xs="12" sm="12" md="3" lg="2" xl="2">
          <h3 className="text-primary text-center">Newest Episode</h3>
        </Col>
        <Col>
          <iframe
            title="podcast"
            src="https://open.spotify.com/embed-podcast/show/77QfKMGg067YXiJnb1Ic3q"
            width="100%"
            height="232"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Col>
      </Row>
    </>
  );
}

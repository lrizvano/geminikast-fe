import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import error404 from "../../error-404-logo.svg";

export default function Error404() {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col xs="10" md="8" lg="6">
          <Image src={error404} fluid></Image>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <h3 className="text-primary mt-3">Page Not Found</h3>
      </Row>
    </>
  );
}

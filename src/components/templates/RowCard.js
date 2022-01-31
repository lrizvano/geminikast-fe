import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardHover from "../styled/CardHover";
import styled from "styled-components";
import ContentPlatforms from "./PlatformIcons";

const Padding = styled.section`
  .col-6 {
    padding-right: 0;
  }
  .col-6:nth-child(2) {
    padding-left: 0;
  }
`;

export default function RowItem(props) {
  return (
    <CardHover>
      <Card className="mb-3">
        <Card.Link href={props.link}>
          <Padding>
            <Row>
              <Col xs="6" lg="3" className="align-self-center">
                <Card.Img src={props.image} />
              </Col>
              <Col xs="6">
                <Card.Body className="text-info">
                  <Card.Title className="font-weight-bold">
                    {props.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2">
                    <div className="mb-1">
                      {props.author}{" "}
                      {props.link.startsWith("news")
                        ? "reported on"
                        : "reviewed on"}{" "}
                      {props.date}
                    </div>
                    <ContentPlatforms {...props.platforms} />
                  </Card.Subtitle>
                </Card.Body>
              </Col>
            </Row>
          </Padding>
        </Card.Link>
      </Card>
    </CardHover>
  );
}

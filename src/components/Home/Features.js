import React from "react";
import ContentTile from "../templates/TileItem.js";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { formatTileData } from "../../utils/formatters.js";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`;

export default function Features(props) {
  const renderFeatures = () =>
    props.features.map((doc) => <ContentTile {...formatTileData(doc)} />);

  return (
    <>
      <h3 className="text-primary mb-3">
        {props.page === "news" ? "Recent News" : "Featured Reviews"}
      </h3>
      <Row>{renderFeatures()}</Row>
      <Wrapper>
        <Button
          className="align-content-center"
          variant="secondary"
          href={`${props.page === "news" ? "/news" : "/reviews"}`}
        >
          {`See All ${props.page === "news" ? "News" : "Reviews"}`}
        </Button>
      </Wrapper>
    </>
  );
}

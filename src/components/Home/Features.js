import React from "react";
import ContentTile from "../ContentTile.js";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { RichText, Date } from "prismic-reactjs";
import { formatDate } from "../../utils/utils.js";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`;

export default function Features(props) {
  const renderFeatures = () => {
    return props.features.map((doc) => {
      const contentTileData = {
        link: doc.type === "article" ? `news/${doc.uid}` : `reviews/${doc.uid}`,
        image: doc.data.image.url,
        title:
          doc.type === "article"
            ? RichText.asText(doc.data.headline)
            : RichText.asText(doc.data.game),
        text: formatDate(Date(doc.data.date)),
      };
      return <ContentTile {...contentTileData} />;
    });
  };

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

import React from "react";
import { RichText } from "prismic-reactjs";
import ContentCard from "../Content/ContentCard.js";
import Row from "react-bootstrap/Row";

export default function Features(props) {
  const renderFeatures = () => {
    console.log(props.features);
    return props.features.map((doc) => {
      const contentCardData = {
        link: doc.type === "article" ? `news/${doc.uid}` : `reviews/${doc.uid}`,
        image: doc.data.image.url || doc.data.image.url,
        title:
          doc.type === "article"
            ? RichText.asText(doc.data.headline)
            : RichText.asText(doc.data.game),
        text: RichText.asText(doc.data.author.data.name),
      };
      return <ContentCard {...contentCardData} />;
    });
  };

  return (
    <>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <h3 className="text-primary">
        {props.page === "news" ? "Newest Articles" : "Newest Reviews"}
      </h3>
      <Row>{renderFeatures()}</Row>
    </>
  );
}

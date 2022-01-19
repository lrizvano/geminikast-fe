import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import ContentCard from "../../Content/ContentCard.js";
import DateFormat from "../../DateFormat.js";

export default function AuthorContent(props) {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const articles = await client.query([
        Prismic.Predicates.at("document.type", "article"),
        Prismic.Predicates.at("my.article.author", `${props.id}`),
      ]);
      const reviews = await client.query([
        Prismic.Predicates.at("document.type", "review"),
        Prismic.Predicates.at("my.review.author", `${props.id}`),
      ]);
      if (articles && reviews) {
        const response = articles.results
          .concat(reviews.results)
          .sort((a, b) => Date(b.data.date) - Date(a.data.date));
        setDocs(response);
      }
    };
    fetchData();
  }, [props.id]);

  const renderDocs = () => {
    return docs.map((doc) => {
      const contentCardData = {
        link:
          doc.type === "article" ? `/news/${doc.uid}` : `/reviews/${doc.uid}`,
        image: doc.data.image.url,
        title:
          doc.type === "article"
            ? RichText.asText(doc.data.headline)
            : RichText.asText(doc.data.game),
        text: <DateFormat date={Date(doc.data.date)} />,
      };
      return <ContentCard {...contentCardData} />;
    });
  };

  return (
    <>
      <h1 className="mt-3 text-primary">Kontent</h1>
      <Row>{renderDocs()}</Row>
    </>
  );
}

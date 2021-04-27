import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Title from "../../Title.js";

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
    return docs.map((doc) => (
      <Card bg="primary">
        <Card.Link
          href={
            doc.type === "article" ? `/news/${doc.uid}` : `/reviews/${doc.uid}`
          }
          style={{ color: "#000000" }}
        >
          <Card.Img variant="top" src={`${doc.data.image.url}/200px200`} />
          <Card.Body>
            <Card.Title>
              {doc.type === "article"
                ? RichText.asText(doc.data.headline)
                : RichText.asText(doc.data.game)}
            </Card.Title>
          </Card.Body>
        </Card.Link>
      </Card>
    ));
  };

  return (
    <>
      <Title>Content</Title>
      <CardColumns>{renderDocs()}</CardColumns>
    </>
  );
}

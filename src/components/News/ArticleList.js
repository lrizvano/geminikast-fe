import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

export default function ArticleList() {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "article"),
        { fetchLinks: "author.name" }
      );
      if (response) {
        setArticles(response.results);
      }
    };
    fetchData();
  }, []);

  const renderArticles = () => {
    return articles.map((article) => {
      return (
        <Card bg="primary">
          <Card.Link href={`news/${article.uid}`} style={{ color: "#000000" }}>
            <Card.Img
              variant="top"
              src={`${article.data.image.url}/200px200`}
            />
            <Card.Body>
              <Card.Title>{RichText.asText(article.data.headline)}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                By {RichText.asText(article.data.author.data.name)}
              </small>
            </Card.Footer>
          </Card.Link>
        </Card>
      );
    });
  };

  return (
    <>
      <CardColumns>{renderArticles()}</CardColumns>
    </>
  );
}

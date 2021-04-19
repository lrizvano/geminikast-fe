import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Articles() {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "article")
      );
      if (response) {
        setArticles(response.results);
      }
    };
    fetchData();
  }, []);

  const renderArticles = () => {
    return articles.map((article) => (
      <Col xs={6} md={4} bg="primary">
        <Card key={article.uid} bg="primary">
          <Button href={`news/${article.uid}`}>
            <Card.Img variant="top" src={article.data.image.url} />
            <Card.Body>
              <Card.Title>{RichText.asText(article.data.headline)}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                {Date(article.data.date).toString()}
              </small>
            </Card.Footer>
          </Button>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <Row>{renderArticles()}</Row>
    </>
  );
}

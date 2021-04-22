import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

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
        <Col xs={6} md={4} bg="primary" key={article.uid}>
          <Card bg="primary">
            <Card.Link
              href={`news/${article.uid}`}
              style={{ color: "#000000" }}
            >
              <Card.Img variant="top" src={article.data.image.url} />
              <Card.Body>
                <Card.Title>
                  {RichText.asText(article.data.headline)}
                </Card.Title>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  By {RichText.asText(article.data.author.data.name)}
                </small>
              </Card.Footer>
            </Card.Link>
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <Row>{renderArticles()}</Row>
    </>
  );
}

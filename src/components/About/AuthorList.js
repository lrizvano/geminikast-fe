import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function AuthorList() {
  const [authors, setAuthors] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "author")
      );
      if (response) {
        setAuthors(response.results);
      }
    };
    fetchData();
  }, []);

  const renderAuthors = () => {
    return authors.map((author) => (
      <Col xs={6} md={4} key={author.uid}>
        <Card bg="primary">
          <Button href={`author/${author.uid}`}>
            <Card.Img variant="top" src={author.data.image.url} />
            <Card.Body>
              <Card.Title>{RichText.asText(author.data.name)}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                {RichText.asText(author.data.role)}
              </small>
            </Card.Footer>
          </Button>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <Row>{renderAuthors()}</Row>
    </>
  );
}

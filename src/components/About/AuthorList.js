import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

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
      <Card bg="primary">
        <Card.Link href={`author/${author.uid}`} style={{ color: "#000000" }}>
          <Card.Img variant="top" src={`${author.data.image.url}/200px200`} />
          <Card.Body>
            <Card.Title>{RichText.asText(author.data.name)}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              {RichText.asText(author.data.role)}
            </small>
          </Card.Footer>
        </Card.Link>
      </Card>
    ));
  };

  return (
    <>
      <CardColumns>{renderAuthors()}</CardColumns>
    </>
  );
}

import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "review"),
        { fetchLinks: "author.name" }
      );
      if (response) {
        setReviews(response.results);
      }
    };
    fetchData();
  }, []);

  const renderReviews = () => {
    return reviews.map((review) => (
      <Col xs={6} md={4} key={review.uid}>
        <Card bg="primary">
          <Card.Link
            href={`reviews/${review.uid}`}
            style={{ color: "#000000" }}
          >
            <Card.Img variant="top" src={review.data.image.url} />
            <Card.Body>
              <Card.Title>{RichText.asText(review.data.game)}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                By {RichText.asText(review.data.author.data.name)}
              </small>
            </Card.Footer>
          </Card.Link>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <Row>{renderReviews()}</Row>
    </>
  );
}

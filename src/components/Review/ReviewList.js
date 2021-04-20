import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Reviews() {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "review")
      );
      if (response) {
        setReviews(response.results);
      }
    };
    fetchData();
  }, []);

  const renderReviews = () => {
    return reviews.map((review) => (
      <Col xs={6} md={4}>
        <Card key={review.uid} bg="primary">
          <Button href={`reviews/${review.uid}`}>
            <Card.Img variant="top" src={review.data.image.url} />
            <Card.Body>
              <Card.Title>{RichText.asText(review.data.game)}</Card.Title>
            </Card.Body>
          </Button>
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
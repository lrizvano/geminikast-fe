import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import ReviewCard from "./ReviewCard.js";

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "review"),
        { fetchLinks: "author.name", orderings: "[my.review.date desc]" }
      );
      if (response) {
        setReviews(response.results);
      }
    };
    fetchData();
  }, []);

  const renderReviews = () => {
    return reviews.map((review) => {
      const reviewCardData = {
        uid: review.uid,
        image: review.data.image.url,
        game: RichText.asText(review.data.game),
        author: RichText.asText(review.data.author.data.name),
      };
      return <ReviewCard {...reviewCardData} />;
    });
  };

  return (
    <>
      <Row>{renderReviews()}</Row>
    </>
  );
}

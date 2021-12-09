import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import ContentCard from "../Content/ContentCard.js";

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
      const contentCardData = {
        link: `reviews/${review.uid}`,
        image: review.data.image.url,
        title: RichText.asText(review.data.game),
        text: RichText.asText(review.data.author.data.name),
      };
      return <ContentCard {...contentCardData} />;
    });
  };

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">All Reviews</h1>
      <Row>{renderReviews()}</Row>
    </>
  );
}

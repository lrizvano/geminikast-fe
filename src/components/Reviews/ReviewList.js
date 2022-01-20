import React from "react";
import Prismic from "@prismicio/client";
import { client } from "../../prismic-configuration.js";
import ContentRow from "../ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import DateFormat from "../DateFormat.js";

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
      const contentRowData = {
        link: `reviews/${review.uid}`,
        image: review.data.image.url,
        title: RichText.asText(review.data.game),
        author: RichText.asText(review.data.author.data.name),
        date: <DateFormat date={Date(review.data.date)} />,
      };
      return <ContentRow {...contentRowData} />;
    });
  };

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">All Reviews</h1>
      {renderReviews()}
    </>
  );
}

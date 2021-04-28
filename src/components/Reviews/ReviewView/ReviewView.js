import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import ReviewCover from "./ReviewCover.js";
import ReviewBody from "./ReviewBody.js";

export default function ReviewView(props) {
  const [review, setReview] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.review.uid", `${props.match.params.uid}`),
        { fetchLinks: "author.name" }
      );
      if (response) {
        setReview(response.results[0]);
      }
    };
    fetchData();
  }, [props.match.params.uid]);

  const renderReview = () => {
    if (review) {
      const reviewCoverData = {
        image: review.data.image.url,
        game: RichText.asText(review.data.game),
        uid: review.data.author.uid,
        name: RichText.asText(review.data.author.data.name),
        date: Date(review.data.date),
      };

      const reviewBodyData = {
        body: review.data.body,
        score: review.data.score,
        summary: RichText.asText(review.data.summary),
      };

      return (
        <>
          <ReviewCover {...reviewCoverData} />
          <hr className="bg-primary" />
          <ReviewBody {...reviewBodyData} />
        </>
      );
    }
    return <></>;
  };

  return <>{renderReview()}</>;
}

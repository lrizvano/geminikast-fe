import React from "react";
import { RichText, Date } from "prismic-reactjs";
import ContentCover from "../../ContentCover.js";
import ReviewBody from "./ReviewBody.js";
import ContentAuthor from "../../ContentAuthor.js";
import { viewDocument } from "../../../utils/queries";

export default function ReviewView(props) {
  const [review, setReview] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await viewDocument("review", props.match.params.uid);
      if (response) {
        setReview(response.results[0]);
      }
    };
    fetchData();
  }, [props.match.params.uid]);

  const renderReview = () => {
    if (review) {
      const contentCoverData = {
        image: review.data.image.url,
        title: `${RichText.asText(review.data.game)} Review`,
        uid: review.data.author.uid,
        name: RichText.asText(review.data.author.data.name),
        date: Date(review.data.date),
      };

      const reviewBodyData = {
        body: review.data.body,
        score: review.data.score,
        summary: RichText.asText(review.data.summary),
      };

      const contentAuthorData = {
        uid: review.data.author.uid,
      };

      return (
        <>
          <ContentCover {...contentCoverData} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ReviewBody {...reviewBodyData} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ContentAuthor {...contentAuthorData} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
        </>
      );
    }
    return <></>;
  };

  return <>{renderReview()}</>;
}

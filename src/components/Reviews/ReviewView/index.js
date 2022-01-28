import React from "react";
import ContentCover from "../../ContentCover.js";
import ReviewBody from "./ReviewBody.js";
import ContentAuthor from "../../ContentAuthor.js";
import { viewDocument } from "../../../utils/queries";
import {
  formatDocumentCover,
  formatReviewBody,
} from "../../../utils/formatters";

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
      const contentAuthorData = {
        uid: review.data.author.uid,
      };

      return (
        <>
          <ContentCover {...formatDocumentCover(review)} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ReviewBody {...formatReviewBody(review)} />
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

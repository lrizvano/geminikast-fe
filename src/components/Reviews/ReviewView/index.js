import React from "react";
import ContentCover from "../../ContentCover.js";
import ReviewBody from "./ReviewBody.js";
import ContentAuthor from "../../ContentAuthor.js";
import { viewDocument } from "../../../utils/queries";
import {
  formatDocumentCover,
  formatReviewBody,
} from "../../../utils/formatters";
import Error404 from "../../Error404/index.js";

export default function ReviewView(props) {
  const [review, setReview] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await viewDocument("review", props.match.params.uid);
      if (response) {
        setReview(response.results[0]);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [props.match.params.uid]);

  const renderReview = () => {
    if (review) {
      return (
        <>
          <ContentCover {...formatDocumentCover(review)} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ReviewBody {...formatReviewBody(review)} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ContentAuthor {...review.data.author} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
        </>
      );
    }
    return (
      <>
        <Error404></Error404>
      </>
    );
  };

  return <>{!isLoading && renderReview()}</>;
}

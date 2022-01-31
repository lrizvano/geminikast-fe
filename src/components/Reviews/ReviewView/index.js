import React from "react";
import ContentHeader from "../../templates/ContentHeader.js";
import ReviewBody from "./ReviewBody.js";
import ContentFooter from "../../templates/ContentFooter.js";
import { viewDocument } from "../../../utils/queries";
import {
  formatContentHeaderData,
  formatReviewBody,
} from "../../../utils/formatters";
import Error404 from "../../Error404/index.js";
import Divider from "../../common/Divider.js";

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
          <ContentHeader {...formatContentHeaderData(review)} />
          <Divider />
          <ReviewBody {...formatReviewBody(review)} />
          <Divider />
          <ContentFooter {...review.data.author} />
          <Divider />
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

import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Image from "react-bootstrap/Image";

export default function Review(props) {
  const [review, setReview] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.review.uid", `${props.match.params.uid}`),
        { lang: "*" }
      );
      if (response) {
        setReview(response.results[0]);
      }
    };
    fetchData();
  }, []);

  const renderReview = () => {
    if (review) {
      return (
        <>
          <Image fluid src={review.data.image.url} />
          {RichText.asText(review.data.game)}
          <RichText
            render={review.data.body}
            htmlSerializer={client.htmlSerializer}
          ></RichText>
          <small className="text-muted">{review.data.score}</small>
        </>
      );
    }
    return <></>;
  };

  return <>{renderReview()}</>;
}

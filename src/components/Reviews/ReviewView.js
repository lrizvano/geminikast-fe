import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import Badge from "react-bootstrap/Badge";

const Title = styled.h1`
  margin-top: 1rem;
  color: var(--primary);
`;

const Line = styled.hr`
  background-color: var(--primary);
`;

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
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(Date(review.data.date));

      return (
        <>
          <Image fluid src={review.data.image.url} />
          <Title>{RichText.asText(review.data.game)}</Title>
          {formattedDate}
          <Line />
          <RichText
            render={review.data.body}
            htmlSerializer={client.htmlSerializer}
          ></RichText>
          <h1>
            <Badge variant="secondary">{review.data.score / 10}</Badge>
          </h1>
        </>
      );
    }
    return <></>;
  };

  return <>{renderReview()}</>;
}

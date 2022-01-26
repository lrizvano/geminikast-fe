import React from "react";
import Prismic from "@prismicio/client";
import { client } from "../../prismic-configuration.js";
import ContentRow from "../ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import DateFormat from "../DateFormat.js";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const platformList = ["PC", "Playstation", "Xbox", "Movie", "Tabletop"];

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const [platforms, setPlatforms] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        [
          Prismic.Predicates.at("document.type", "review"),
          Prismic.Predicates.any("my.review.platforms.platform", platforms),
        ],
        { fetchLinks: "author.name", orderings: "[my.review.date desc]" }
      );
      if (response) {
        setReviews(response.results);
      }
    };
    fetchData();
  }, [platforms]);

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
      <h1 className="mt-5 mb-3 text-primary">
        {platforms.length === 0 ? "All Reviews" : "Filtered Reviews"}
      </h1>
      <ToggleButtonGroup type="checkbox" onChange={setPlatforms}>
        {platformList.map((platformName) => (
          <ToggleButton variant="dark" value={platformName}>
            {platformName}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {reviews.length === 0 ? <p>No filtered reviews</p> : renderReviews()}
    </>
  );
}

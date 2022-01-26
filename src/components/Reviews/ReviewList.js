import React from "react";
import Prismic from "@prismicio/client";
import { client } from "../../prismic-configuration.js";
import ContentRow from "../ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import DateFormat from "../DateFormat.js";
import Dropdown from "react-bootstrap/Dropdown";

const platformList = [
  "All Platforms",
  "Playstation",
  "Xbox",
  "Nintendo",
  "PC",
  "Movies",
  "Shows",
  "Comics",
  "Tabletop",
];

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const [platform, setPlatform] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platform) {
        response = await client.query(
          [
            Prismic.Predicates.at("document.type", "review"),
            Prismic.Predicates.at("my.review.platforms.platform", platform),
          ],
          { fetchLinks: "author.name", orderings: "[my.review.date desc]" }
        );
      } else {
        response = await client.query(
          Prismic.Predicates.at("document.type", "review"),

          { fetchLinks: "author.name", orderings: "[my.review.date desc]" }
        );
      }

      if (response) {
        setReviews(response.results);
      }
    };
    fetchData();
  }, [platform]);

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

  const updatePlatform = (platform) => {
    if (platform === "All Platforms") {
      setPlatform("");
    } else {
      setPlatform(platform);
    }
  };

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">
        {platform.length === 0 ? "All Reviews" : "Filtered Reviews"}
      </h1>
      <Dropdown className="mb-5" onSelect={updatePlatform}>
        <Dropdown.Toggle variant="secondary">
          {platform === "" ? "All Platforms" : platform}
        </Dropdown.Toggle>
        <Dropdown.Menu className="mb-3">
          {platformList.map((platformName) => (
            <Dropdown.Item eventKey={platformName}>
              {platformName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {reviews.length === 0 ? <p>No results found.</p> : renderReviews()}
    </>
  );
}

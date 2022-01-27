import React from "react";
import Prismic from "@prismicio/client";
import { client } from "../../prismic-configuration.js";
import ContentRow from "../ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import DateFormat from "../DateFormat.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Hover = styled.section`
  .dropdown-item:hover,
  .dropdown-item:focus {
    color: #16181b;
    text-decoration: none;
    background-color: var(--secondary);
  }
`;

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

const sortList = {
  Latest: "[my.review.date desc]",
  Oldest: "[my.review.date]",
  Best: "[my.review.score desc]",
  Worst: "[my.review.score]",
  "A-Z": "[my.review.game]",
  "Z-A": "[my.review.game desc]",
};

const formatParam = (param) => {
  if (param === "all-platforms") {
    return "All Platforms";
  }
  if (param === "pc") {
    return "PC";
  }
  if (param === "a-z") {
    return "A-Z";
  }
  return param?.charAt(0).toUpperCase() + param?.slice(1);
};

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const search = useLocation().search;
  const platformParam = new URLSearchParams(search).get("platform");
  const sortParam = new URLSearchParams(search).get("sort");
  const [platform, setPlatform] = React.useState(
    formatParam(platformParam) || "All Platforms"
  );
  const [sort, setSort] = React.useState(formatParam(sortParam) || "Latest");

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platform !== "All Platforms") {
        response = await client.query(
          [
            Prismic.Predicates.at("document.type", "review"),
            Prismic.Predicates.at("my.review.platforms.platform", platform),
          ],
          { fetchLinks: "author.name", orderings: sortList[sort] }
        );
      } else {
        response = await client.query(
          Prismic.Predicates.at("document.type", "review"),

          { fetchLinks: "author.name", orderings: sortList[sort] }
        );
      }
      if (response) {
        setReviews(response.results);
      }
    };
    fetchData();
  }, [platform, sort]);

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

  const createSortItems = () => {
    let sortItems = [];
    Object.entries(sortList).forEach(([key, value]) => {
      sortItems.push(
        <Hover>
          <Dropdown.Item className="text-info" eventKey={key}>
            {key}
          </Dropdown.Item>
        </Hover>
      );
    });
    return sortItems;
  };

  const formatPlatform = (platform) => {
    if (platform === "All Platforms") {
      return "";
    }
    if (platform.endsWith("s")) {
      return platform.slice(0, -1);
    }
    return platform;
  };

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">
        {`${sort} ${formatPlatform(platform)}`} Reviews
      </h1>
      <Row className="mb-3">
        <Col xs="auto">
          <Dropdown onSelect={setPlatform}>
            <Dropdown.Toggle variant="secondary">{platform}</Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark">
              {platformList.map((platformName) => (
                <Hover>
                  <Dropdown.Item eventKey={platformName} className="text-info">
                    {platformName}
                  </Dropdown.Item>
                </Hover>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Dropdown onSelect={setSort}>
            <Dropdown.Toggle variant="secondary">{sort}</Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark">
              {createSortItems()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {reviews.length === 0 ? <p>No results found.</p> : renderReviews()}
    </>
  );
}

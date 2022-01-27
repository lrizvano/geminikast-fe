import React from "react";
import ContentRow from "../ContentRow.js";
import { formatDate } from "../../utils/utils.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useHistory } from "react-router-dom";
import { listDocuments, listFilteredDocuments } from "../../utils/queries";
import { RichText, Date } from "prismic-reactjs";
import {
  platformList,
  reviewSort,
  updateHistory,
} from "../../utils/filters.js";
import DropdownHover from "../styled/DropdownHover.js";

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const search = useLocation().search;
  const platformParam = new URLSearchParams(search).get("platform");
  const sortParam = new URLSearchParams(search).get("sort");
  const [platformKey, setPlatformKey] = React.useState(
    platformParam || Object.keys(platformList)[0]
  );
  const [sortKey, setSortKey] = React.useState(
    sortParam || Object.keys(reviewSort)[0]
  );
  let history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platformKey !== Object.keys(platformList)[0]) {
        response = await listFilteredDocuments(
          "review",
          platformKey,
          reviewSort[sortKey].query
        );
      } else {
        response = await listDocuments("review", reviewSort[sortKey].query);
      }
      if (response) {
        setReviews(response.results);
      }
    };
    updateHistory(history, platformKey, sortKey);
    fetchData();
  }, [history, platformKey, sortKey]);

  const renderReviews = () => {
    return reviews.map((review) => {
      const contentRowData = {
        link: `reviews/${review.uid}`,
        image: review.data.image.url,
        title: RichText.asText(review.data.game),
        author: RichText.asText(review.data.author.data.name),
        date: formatDate(Date(review.data.date)),
      };
      return <ContentRow {...contentRowData} />;
    });
  };

  const renderPlatformItems = () => {
    let platformItems = [];
    Object.entries(platformList).forEach(([key, value]) => {
      platformItems.push(
        <DropdownHover>
          <Dropdown.Item className="text-info" eventKey={key}>
            {value}
          </Dropdown.Item>
        </DropdownHover>
      );
    });
    return platformItems;
  };

  const renderSortItems = () => {
    let sortItems = [];
    Object.entries(reviewSort).forEach(([key, value]) => {
      sortItems.push(
        <DropdownHover>
          <Dropdown.Item className="text-info" eventKey={key}>
            {value.title}
          </Dropdown.Item>
        </DropdownHover>
      );
    });
    return sortItems;
  };

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">
        {`${reviewSort[sortKey].title} ${
          platformList[platformKey] ===
          platformList[Object.keys(platformList)[0]]
            ? ""
            : platformList[platformKey]
        }`}{" "}
        Reviews
      </h1>
      <Row className="mb-3">
        <Col xs="auto">
          <Dropdown onSelect={setPlatformKey}>
            <Dropdown.Toggle variant="secondary">
              {platformList[platformKey]}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark">
              {renderPlatformItems()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Dropdown onSelect={setSortKey}>
            <Dropdown.Toggle variant="secondary">
              {reviewSort[sortKey].title}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark">
              {renderSortItems()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {reviews.length === 0 ? <p>No results found.</p> : renderReviews()}
    </>
  );
}

import React from "react";
import ContentRow from "../ContentRow.js";
import { formatDate } from "../../utils/utils.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useHistory } from "react-router-dom";
import { listDocuments, listFilterDocuments } from "../../utils/queries";
import { RichText, Date } from "prismic-reactjs";
import {
  platformList,
  reviewSort,
  formatParam,
  updateHistory,
  formatPlatform,
} from "../../utils/filters.js";
import DropdownHover from "../styled/DropdownHover.js";

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const search = useLocation().search;
  const platformParam = new URLSearchParams(search).get("platform");
  const sortParam = new URLSearchParams(search).get("sort");
  const [platform, setPlatform] = React.useState(
    formatParam(platformParam) || "All Platforms"
  );
  const [sort, setSort] = React.useState(formatParam(sortParam) || "Latest");
  let history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platform !== "All Platforms") {
        response = await listFilterDocuments(
          "review",
          platform,
          reviewSort[sort]
        );
      } else {
        response = await listDocuments("review", reviewSort[sort]);
      }
      if (response) {
        setReviews(response.results);
      }
    };
    updateHistory(history, platform, sort);
    fetchData();
  }, [history, platform, sort]);

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

  const renderSortItems = () => {
    let sortItems = [];
    Object.entries(reviewSort).forEach(([key, value]) => {
      sortItems.push(
        <DropdownHover>
          <Dropdown.Item className="text-info" eventKey={key}>
            {key}
          </Dropdown.Item>
        </DropdownHover>
      );
    });
    return sortItems;
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
                <DropdownHover>
                  <Dropdown.Item eventKey={platformName} className="text-info">
                    {platformName}
                  </Dropdown.Item>
                </DropdownHover>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Dropdown onSelect={setSort}>
            <Dropdown.Toggle variant="secondary">{sort}</Dropdown.Toggle>
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

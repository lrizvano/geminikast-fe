import React from "react";
import ContentRow from "../ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import { formatDate } from "../../utils/utils.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useHistory } from "react-router-dom";
import { listDocuments, listFilteredDocuments } from "../../utils/queries";
import {
  platformList,
  articleSort,
  updateHistory,
} from "../../utils/filters.js";
import DropdownHover from "../styled/DropdownHover.js";

export default function ArticleList() {
  const [articles, setArticles] = React.useState([]);
  const search = useLocation().search;
  const platformParam = new URLSearchParams(search).get("platform");
  const sortParam = new URLSearchParams(search).get("sort");
  const [platformKey, setPlatformKey] = React.useState(
    platformParam || Object.keys(platformList)[0]
  );
  const [sortKey, setSortKey] = React.useState(
    sortParam || Object.keys(articleSort)[0]
  );
  let history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platformKey !== Object.keys(platformList)[0]) {
        response = await listFilteredDocuments(
          "article",
          platformKey,
          articleSort[sortKey].query
        );
      } else {
        response = await listDocuments("article", articleSort[sortKey].query);
      }
      if (response) {
        setArticles(response.results);
      }
    };
    updateHistory(history, platformKey, sortKey);
    fetchData();
  }, [history, platformKey, sortKey]);

  const renderArticles = () => {
    return articles.map((article) => {
      const contentRowData = {
        link: `news/${article.uid}`,
        image: article.data.image.url,
        title: RichText.asText(article.data.headline),
        author: RichText.asText(article.data.author.data.name),
        date: formatDate(Date(article.data.date)),
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
    Object.entries(articleSort).forEach(([key, value]) => {
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
        {`${articleSort[sortKey].title} ${
          platformList[platformKey] ===
          platformList[Object.keys(platformList)[0]]
            ? ""
            : platformList[platformKey]
        }`}{" "}
        News
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
              {articleSort[sortKey].title}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark">
              {renderSortItems()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {articles.length === 0 ? <p>No results found.</p> : renderArticles()}
    </>
  );
}

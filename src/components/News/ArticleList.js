import React from "react";
import ContentRow from "../ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import DateFormat from "../DateFormat.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useHistory } from "react-router-dom";
import { listDocuments, listFilterDocuments } from "../../utils/queries";
import {
  platformList,
  articleSort,
  formatParam,
  updateHistory,
  formatPlatform,
} from "../../utils/filters.js";
import DropdownHover from "../styled/DropdownHover.js";

export default function ArticleList() {
  const [articles, setArticles] = React.useState([]);
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
          "article",
          platform,
          articleSort[sort]
        );
      } else {
        response = await listDocuments("article", articleSort[sort]);
      }
      if (response) {
        setArticles(response.results);
      }
    };
    updateHistory(history, platform, sort);
    fetchData();
  }, [history, platform, sort]);

  const renderArticles = () => {
    return articles.map((article) => {
      const contentRowData = {
        link: `news/${article.uid}`,
        image: article.data.image.url,
        title: RichText.asText(article.data.headline),
        author: RichText.asText(article.data.author.data.name),
        date: <DateFormat date={Date(article.data.date)} />,
      };
      return <ContentRow {...contentRowData} />;
    });
  };

  const renderSortItems = () => {
    let sortItems = [];
    Object.entries(articleSort).forEach(([key, value]) => {
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
        {`${sort} ${formatPlatform(platform)}`} News
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

      {articles.length === 0 ? <p>No results found.</p> : renderArticles()}
    </>
  );
}

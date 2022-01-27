import React from "react";
import ContentRow from "../ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import DateFormat from "../DateFormat.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { listDocuments, listFilterDocuments } from "../../utils/queries";

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
  Latest: "[my.article.date desc]",
  Oldest: "[my.article.date]",
  "A-Z": "[my.article.headline]",
  "Z-A": "[my.article.headline desc]",
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
    const updateHistory = async () => {
      if (platform === "All Platforms" && sort === "Latest") {
        history.push({
          search: ``,
        });
      } else if (platform !== "All Platforms" && sort !== "Latest") {
        history.push({
          search: `?platform=${platform.toLowerCase()}&sort=${sort.toLowerCase()}`,
        });
      } else if (platform !== "All Platforms") {
        history.push({
          search: `?platform=${platform.toLowerCase()}`,
        });
      } else if (sort !== "Latest") {
        history.push({
          search: `?sort=${sort.toLowerCase()}`,
        });
      }
    };
    const fetchData = async () => {
      let response = null;
      if (platform !== "All Platforms") {
        response = await listFilterDocuments(
          "article",
          platform,
          sortList[sort]
        );
      } else {
        response = await listDocuments("article", sortList[sort]);
      }
      if (response) {
        setArticles(response.results);
      }
    };
    updateHistory();
    fetchData();
  }, [platform, sort]);

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

  const formatPlatform = (word) => {
    if (word === "All Platforms") {
      return "";
    }
    if (word.endsWith("s")) {
      return word.slice(0, -1);
    }
    return word;
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

      {articles.length === 0 ? <p>No results found.</p> : renderArticles()}
    </>
  );
}

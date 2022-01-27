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

export default function ArticleList() {
  const [articles, setArticles] = React.useState([]);
  const [platform, setPlatform] = React.useState("All Platforms");
  const [sort, setSort] = React.useState("Latest");

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platform !== "All Platforms") {
        response = await client.query(
          [
            Prismic.Predicates.at("document.type", "article"),
            Prismic.Predicates.at("my.article.platforms.platform", platform),
          ],
          { fetchLinks: "author.name", orderings: sortList[sort] }
        );
      } else {
        response = await client.query(
          Prismic.Predicates.at("document.type", "article"),

          { fetchLinks: "author.name", orderings: sortList[sort] }
        );
      }
      if (response) {
        setArticles(response.results);
      }
    };
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

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">
        {platform === "All Platforms" && sort === "Latest"
          ? "All News"
          : "Filtered News"}
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

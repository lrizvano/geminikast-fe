import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import ContentCard from "../Content/ContentCard.js";

export default function ArticleList() {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "article"),
        { fetchLinks: "author.name", orderings: "[my.article.date desc]" }
      );
      if (response) {
        setArticles(response.results);
      }
    };
    fetchData();
  }, []);

  const renderArticles = () => {
    return articles.map((article) => {
      const contentCardData = {
        link: `news/${article.uid}`,
        image: article.data.image.url,
        title: RichText.asText(article.data.headline),
        text: RichText.asText(article.data.author.data.name),
      };
      return <ContentCard {...contentCardData} />;
    });
  };

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">News</h1>
      <Row>{renderArticles()}</Row>
    </>
  );
}

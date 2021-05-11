import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import ArticleCard from "./ArticleCard.js";

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
      const articleCardData = {
        uid: article.uid,
        image: article.data.image.url,
        headline: RichText.asText(article.data.headline),
        author: RichText.asText(article.data.author.data.name),
      };
      return <ArticleCard {...articleCardData} />;
    });
  };

  return (
    <>
      <Row>{renderArticles()}</Row>
    </>
  );
}

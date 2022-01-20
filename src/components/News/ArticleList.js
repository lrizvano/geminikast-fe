import React from "react";
import Prismic from "@prismicio/client";
import { client } from "../../prismic-configuration.js";
import ContentRow from "../Content/ContentRow.js";
import { RichText, Date } from "prismic-reactjs";
import DateFormat from "../DateFormat.js";

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

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">All News</h1>
      {renderArticles()}
    </>
  );
}

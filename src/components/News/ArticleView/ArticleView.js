import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Line from "../../Line.js";
import ArticleCover from "./ArticleCover.js";
import ArticleBody from "./ArticleBody.js";

export default function ArticleView(props) {
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.article.uid", `${props.match.params.uid}`),
        { fetchLinks: "author.name" }
      );
      if (response) {
        setArticle(response.results[0]);
      }
    };
    fetchData();
  }, []);

  const renderArticle = () => {
    if (article) {
      const articleCoverData = {
        image: article.data.image.url,
        headline: RichText.asText(article.data.headline),
        uid: article.data.author.uid,
        name: RichText.asText(article.data.author.data.name),
        date: Date(article.data.date),
      };

      const articleBodyData = {
        body: article.data.body,
      };

      return (
        <>
          <ArticleCover {...articleCoverData} />
          <Line />
          <ArticleBody {...articleBodyData} />
        </>
      );
    }
    return <></>;
  };

  return <>{renderArticle()}</>;
}

import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import ContentCover from "../../Content/ContentCover.js";
import ArticleBody from "./ArticleBody.js";
import ContentAuthor from "../../Content/ContentAuthor.js";

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
  }, [props.match.params.uid]);

  const renderArticle = () => {
    if (article) {
      const articleCoverData = {
        image: article.data.image.url,
        title: RichText.asText(article.data.headline),
        uid: article.data.author.uid,
        name: RichText.asText(article.data.author.data.name),
        date: Date(article.data.date),
      };

      const articleBodyData = {
        body: article.data.body,
      };

      const contentAuthorData = {
        uid: article.data.author.uid,
      };

      return (
        <>
          <ContentCover {...articleCoverData} />
          <hr className="bg-primary" />
          <ArticleBody {...articleBodyData} />
          <hr className="bg-primary" />
          <ContentAuthor {...contentAuthorData} />
        </>
      );
    }
    return <></>;
  };

  return <>{renderArticle()}</>;
}

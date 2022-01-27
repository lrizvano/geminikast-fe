import React from "react";
import { RichText, Date } from "prismic-reactjs";
import ContentCover from "../../ContentCover.js";
import ArticleBody from "./ArticleBody.js";
import ContentAuthor from "../../ContentAuthor.js";
import { viewDocument } from "../../../utils/queries";

export default function ArticleView(props) {
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await viewDocument("article", props.match.params.uid);
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
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ArticleBody {...articleBodyData} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ContentAuthor {...contentAuthorData} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
        </>
      );
    }
    return <></>;
  };

  return <>{renderArticle()}</>;
}

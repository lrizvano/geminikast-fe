import React from "react";
import ContentCover from "../../ContentCover.js";
import ArticleBody from "./ArticleBody.js";
import ContentAuthor from "../../ContentAuthor.js";
import { viewDocument } from "../../../utils/queries";
import { formatDocumentCover } from "../../../utils/formatters";

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
      const articleBodyData = {
        body: article.data.body,
      };

      const contentAuthorData = {
        uid: article.data.author.uid,
      };

      return (
        <>
          <ContentCover {...formatDocumentCover(article)} />
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

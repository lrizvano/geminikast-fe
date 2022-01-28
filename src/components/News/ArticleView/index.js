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
      return (
        <>
          <ContentCover {...formatDocumentCover(article)} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ArticleBody {...article.data} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <ContentAuthor {...article.data.author} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
        </>
      );
    }
    return <></>;
  };

  return <>{renderArticle()}</>;
}

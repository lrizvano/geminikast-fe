import React from "react";
import ContentCover from "../../templates/ContentHeader.js";
import ArticleBody from "./ArticleBody.js";
import ContentAuthor from "../../templates/ContentFooter.js";
import { viewDocument } from "../../../utils/queries";
import { formatDocumentCover } from "../../../utils/formatters";
import Error404 from "../../Error404/index.js";

export default function ArticleView(props) {
  const [article, setArticle] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await viewDocument("article", props.match.params.uid);
      if (response) {
        setArticle(response.results[0]);
        setIsLoading(false);
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
    return (
      <>
        <Error404></Error404>
      </>
    );
  };

  return <>{!isLoading && renderArticle()}</>;
}

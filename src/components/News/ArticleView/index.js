import React from "react";
import ContentHeader from "../../templates/ContentHeader.js";
import ArticleBody from "./ArticleBody.js";
import ContentFooter from "../../templates/ContentFooter.js";
import { viewDocument } from "../../../utils/queries";
import { formatContentHeaderData } from "../../../utils/formatters";
import Error404 from "../../Error404/index.js";
import Divider from "../../common/Divider.js";

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
          <ContentHeader {...formatContentHeaderData(article)} />
          <Divider />
          <ArticleBody {...article.data} />
          <Divider />
          <ContentFooter {...article.data.author} />
          <Divider />
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

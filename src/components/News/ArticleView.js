import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Image from "react-bootstrap/Image";

export default function Article(props) {
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.article.uid", `${props.match.params.uid}`),
        { lang: "*" }
      );
      if (response) {
        setArticle(response.results[0]);
      }
    };
    fetchData();
  }, []);

  const renderArticle = () => {
    if (article) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(Date(article.data.date));

      return (
        <>
          <Image fluid src={article.data.image.url} />
          {RichText.asText(article.data.game)}
          <RichText
            render={article.data.body}
            htmlSerializer={client.htmlSerializer}
          ></RichText>
          <small className="text-muted">{formattedDate}</small>
        </>
      );
    }
    return <></>;
  };

  return <>{renderArticle()}</>;
}

import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Card from "react-bootstrap/Card";

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
        <Card bg="primary">
          <Card.Img variant="top" src={article.data.image.url} />
          <Card.Body>
            <Card.Title>{RichText.asText(article.data.headline)}</Card.Title>
            <Card.Text>
              <RichText
                render={article.data.body}
                htmlSerializer={client.htmlSerializer}
              ></RichText>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{formattedDate}</small>
          </Card.Footer>
        </Card>
      );
    }
    return <></>;
  };

  return <>{renderArticle()}</>;
}

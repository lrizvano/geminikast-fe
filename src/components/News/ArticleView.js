import React from "react";
import Prismic from "@prismicio/client";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "../Title.js";
import Line from "../Line.js";

export default function Article(props) {
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
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(Date(article.data.date));

      return (
        <>
          <Image fluid src={article.data.image.url} />
          <Title>{RichText.asText(article.data.headline)}</Title>
          {"By "}
          <Link replace to={`/author/${article.data.author.uid}`}>
            {RichText.asText(article.data.author.data.name)}
          </Link>
          <br />
          <small className="text-muted">{formattedDate}</small>
          <Line />
          <RichText
            render={article.data.body}
            htmlSerializer={client.htmlSerializer}
          ></RichText>
        </>
      );
    }
    return <></>;
  };

  return <>{renderArticle()}</>;
}

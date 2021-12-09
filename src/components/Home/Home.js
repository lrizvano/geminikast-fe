import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import Prismic from "@prismicio/client";
import { client } from "../../prismic-configuration.js";

export default function Home() {
  const [reviews, setReviews] = React.useState([]);
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const reviewDocs = await client.query(
        Prismic.Predicates.at("document.type", "review"),
        { fetchLinks: "author.name", orderings: "[my.review.date desc]" }
      );
      const articleDocs = await client.query(
        Prismic.Predicates.at("document.type", "article"),
        { fetchLinks: "author.name", orderings: "[my.article.date desc]" }
      );
      if (reviewDocs) {
        setReviews(reviewDocs.results);
      }
      if (articleDocs) {
        setArticles(articleDocs.results);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Podcast />
      <Features page={"news"} features={articles} />
      <Features page={"reviews"} features={reviews} />
    </>
  );
}

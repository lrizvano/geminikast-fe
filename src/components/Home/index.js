import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import { featureDocuments } from "../../utils/queries";
import Divider from "../common/Divider.js";

export default function Home() {
  const [reviews, setReviews] = React.useState([]);
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const reviewDocs = await featureDocuments("review");
      const articleDocs = await featureDocuments("article");
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
      <Divider />
      <Features page={"reviews"} features={reviews} />
      <Divider />
      <Features page={"news"} features={articles} />
      <Divider />
    </>
  );
}

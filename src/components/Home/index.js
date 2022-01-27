import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import { featureDocuments } from "../../utils/queries";

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
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <Features page={"reviews"} features={reviews} />
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <Features page={"news"} features={articles} />
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
    </>
  );
}

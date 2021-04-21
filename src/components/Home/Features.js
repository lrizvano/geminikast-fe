import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

export default function Features() {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.any("document.type", ["article", "review"])
      );
      if (response) {
        setDocs(response.results);
      }
    };
    fetchData();
  }, []);

  const renderDocs = () => {
    return docs.map((doc) => (
      <Carousel.Item key={doc.uid}>
        <Link
          to={doc.type === "article" ? `news/${doc.uid}` : `reviews/${doc.uid}`}
        >
          <img className="d-block w-100" src={doc.data.image.url} alt="" />
          <Carousel.Caption>
            <h3>
              {doc.type === "article"
                ? RichText.asText(doc.data.headline)
                : RichText.asText(doc.data.game)}
            </h3>
            <p>{RichText.asText(doc.type)}</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    ));
  };

  return (
    <>
      <Carousel>{renderDocs()}</Carousel>
    </>
  );
}

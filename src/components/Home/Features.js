import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Icons = styled.section`
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 40px;
    height: 40px;
  }
  .carousel-indicators li {
    width: 60px;
    height: 6px;
  }
`;

export default function Features() {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.any("document.type", ["article", "review"]),
        { orderings: "[document.first_publication_date desc]" }
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
          <img
            rounded
            className="d-block w-100"
            src={doc.data.image.url}
            alt=""
          />
          <Carousel.Caption>
            <h3
              class="font-weight-bold"
              style={{
                "-webkit-text-stroke-width": "0.5px",
                "-webkit-text-stroke-color": "black",
              }}
            >
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
      <h3 className="text-primary">Newest Features</h3>
      <Icons>
        <Carousel>{renderDocs()}</Carousel>
      </Icons>
    </>
  );
}

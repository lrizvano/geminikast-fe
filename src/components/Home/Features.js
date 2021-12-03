import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Icons = styled.section`
  .carousel-inner {
    border-radius: 12px 12px 0 0;
  }
  .carousel-control-prev-icon {
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='cyan' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e");
  }
  .carousel-control-next-icon {
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='cyan' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e");
  }
  .carousel-indicators li {
    width: 60px;
    height: 6px;
    background-color: var(--light);
    margin-bottom: 15px;
  }
  .carousel-caption {
    position: relative;
    left: 0;
    margin-top: 20px;
    color: var(--light);
    background-color: var(--secondary);
    border-radius: 0 0 12px 12px;
    z-index: 0;
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
          <img className="d-block w-100" src={doc.data.image.url} alt="" />
          <Carousel.Caption>
            <h3 class="font-weight-bold">
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

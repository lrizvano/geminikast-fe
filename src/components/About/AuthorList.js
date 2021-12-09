import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Row from "react-bootstrap/Row";
import AuthorCard from "./AuthorCard.js";

export default function AuthorList() {
  const [authors, setAuthors] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.type", "author")
      );
      if (response) {
        setAuthors(response.results);
      }
    };
    fetchData();
  }, []);

  const renderAuthors = () => {
    return authors.map((author) => {
      const authorCardData = {
        uid: author.uid,
        image: author.data.image.url,
        name: RichText.asText(author.data.name),
        role: RichText.asText(author.data.role),
      };

      return <AuthorCard {...authorCardData} />;
    });
  };

  return (
    <>
      <h1 className="mb-3 text-primary">Kast</h1>
      <Row>{renderAuthors()}</Row>
    </>
  );
}

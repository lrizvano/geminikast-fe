import React from "react";
import { RichText } from "prismic-reactjs";
import Row from "react-bootstrap/Row";
import AuthorCard from "./AuthorCard.js";
import { listAuthors } from "../../utils/queries";

export default function AuthorList() {
  const [authors, setAuthors] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await listAuthors();
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
      <h1 className="mb-3 text-primary">The Kast</h1>
      <Row>{renderAuthors()}</Row>
    </>
  );
}

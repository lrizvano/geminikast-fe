import React from "react";
import Row from "react-bootstrap/Row";
import AuthorCard from "./AuthorCard.js";
import { listAuthors } from "../../utils/queries";
import { formatAuthorCardData } from "../../utils/formatters";

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

  const renderAuthors = () =>
    authors.map((author) => <AuthorCard {...formatAuthorCardData(author)} />);

  return (
    <>
      <h1 className="mb-3 text-info">The Kast</h1>
      <Row>{renderAuthors()}</Row>
    </>
  );
}

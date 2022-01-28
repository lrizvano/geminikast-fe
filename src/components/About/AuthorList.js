import React from "react";
import Row from "react-bootstrap/Row";
import AuthorCard from "./AuthorCard.js";
import { listAuthors } from "../../utils/queries";
import { formatAuthorData } from "../../utils/formatters";

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
    authors.map((author) => <AuthorCard {...formatAuthorData(author)} />);

  return (
    <>
      <h1 className="mb-3 text-primary">The Kast</h1>
      <Row>{renderAuthors()}</Row>
    </>
  );
}

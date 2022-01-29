import React from "react";
import Row from "react-bootstrap/Row";
import ContentTile from "../../templates/TileItem.js";
import { listAuthorDocuments } from "../../../utils/queries";
import { formatTileData } from "../../../utils/formatters.js";

export default function AuthorContent(props) {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const articles = await listAuthorDocuments("article", props.id);
      const reviews = await listAuthorDocuments("review", props.id);
      if (articles && reviews) {
        const response = articles.results
          .concat(reviews.results)
          .sort((a, b) => Date(b.data.date) - Date(a.data.date));
        setDocs(response);
      }
    };
    fetchData();
  }, [props.id]);

  const renderDocs = () =>
    docs.map((doc) => <ContentTile {...formatTileData(doc)} />);

  return (
    <>
      {docs.length > 0 && <h1 className="text-primary">Content</h1>}
      <Row>{renderDocs()}</Row>
    </>
  );
}

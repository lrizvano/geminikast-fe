import React from "react";
import { RichText, Date } from "prismic-reactjs";
import Row from "react-bootstrap/Row";
import ContentTile from "../../ContentTile.js";
import { formatDate } from "../../../utils/utils.js";
import { listAuthorDocuments } from "../../../utils/queries";

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

  const renderDocs = () => {
    return docs.map((doc) => {
      const contentTileData = {
        link:
          doc.type === "article" ? `/news/${doc.uid}` : `/reviews/${doc.uid}`,
        image: doc.data.image.url,
        title:
          doc.type === "article"
            ? RichText.asText(doc.data.headline)
            : RichText.asText(doc.data.game),
        text: formatDate(Date(doc.data.date)),
      };
      return <ContentTile {...contentTileData} />;
    });
  };

  return (
    <>
      {docs > 0 && <h1 className="mt-3 text-primary">Content</h1>}
      <Row>{renderDocs()}</Row>
    </>
  );
}

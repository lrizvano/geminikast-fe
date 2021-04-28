import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AuthorContent(props) {
  const [author, setAuthor] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("document.id", `${props.id}`),
        { lang: "*" }
      );
      if (response) {
        setAuthor(response.results[0]);
      }
    };
    fetchData();
  }, [props.id]);

  const renderAuthor = () => {
    if (author) {
      return (
        <Row>
          <Col xs="auto">
            <Image src={author.data.image.url} />
          </Col>
          <Col xs="auto">
            <h1 className="mt-3 text-primary">
              {RichText.asText(author.data.name)}
            </h1>
            <small className="text-muted">
              {RichText.asText(author.data.role)}
            </small>
            <RichText
              render={author.data.bio}
              htmlSerializer={client.htmlSerializer}
            ></RichText>
          </Col>
        </Row>
      );
    }
    return <></>;
  };

  return <>{renderAuthor()}</>;
}

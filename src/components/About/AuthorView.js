import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Line from "../Line.js";
import Title from "../Title.js";

export default function AuthorView(props) {
  const [author, setAuthor] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.author.uid", `${props.match.params.uid}`),
        { lang: "*" }
      );
      if (response) {
        setAuthor(response.results[0]);
      }
    };
    fetchData();
  }, [props.match.params.uid]);

  const renderAuthor = () => {
    if (author) {
      return (
        <>
          <Row>
            <Col xs="auto">
              <Image fluid src={author.data.image.url} />
            </Col>
            <Col xs="auto">
              <Title>{RichText.asText(author.data.name)}</Title>
              <small className="text-muted">
                {RichText.asText(author.data.role)}
              </small>
            </Col>
          </Row>
          <Line />
          <RichText
            render={author.data.bio}
            htmlSerializer={client.htmlSerializer}
          ></RichText>
        </>
      );
    }
    return <></>;
  };

  return <>{renderAuthor()}</>;
}

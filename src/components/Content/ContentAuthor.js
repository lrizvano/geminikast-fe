import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function ContentAuthor(props) {
  const [author, setAuthor] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.author.uid", `${props.uid}`),
        { lang: "*" }
      );
      if (response) {
        setAuthor(response.results[0]);
      }
    };
    fetchData();
  }, [props.uid]);

  const renderAuthor = () => {
    if (author) {
      return (
        <>
          <Row className="justify-content-center mb-3">
            <Col xs="auto">
              <Image src={author.data.image.url} />
            </Col>
            <Wrapper>
              <Col xs="auto">
                <h1 className="mt-3 text-primary">
                  <Link replace to={`/author/${props.uid}`}>
                    {RichText.asText(author.data.name)}
                  </Link>
                </h1>
                <small className="text-muted">
                  {RichText.asText(author.data.role)}
                </small>
              </Col>
            </Wrapper>
          </Row>
          <div className="text-center">
            <RichText
              render={author.data.bio}
              htmlSerializer={client.htmlSerializer}
            ></RichText>
          </div>
        </>
      );
    }
    return <></>;
  };

  return <>{renderAuthor()}</>;
}

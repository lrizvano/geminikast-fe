import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../prismic-configuration.js";
import Image from "react-bootstrap/Image";

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
  }, []);

  const renderAuthor = () => {
    if (author) {
      return (
        <>
          <Image fluid src={author.data.image.url} />
          {RichText.asText(author.data.name)}
          <RichText
            render={author.data.bio}
            htmlSerializer={client.htmlSerializer}
          ></RichText>
          <small className="text-muted">
            {RichText.asText(author.data.role)}
          </small>
        </>
      );
    }
    return <></>;
  };

  return <>{renderAuthor()}</>;
}

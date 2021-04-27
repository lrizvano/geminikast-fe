import React from "react";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { client } from "../../../prismic-configuration.js";
import Line from "../../Line.js";
import AuthorCover from "./AuthorCover.js";

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
      const authorCoverData = {
        image: author.data.image.url,
        name: RichText.asText(author.data.name),
        role: RichText.asText(author.data.role),
      };

      return (
        <>
          <AuthorCover {...authorCoverData} />
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

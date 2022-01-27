import React from "react";
import { RichText } from "prismic-reactjs";
import AuthorCover from "./AuthorCover.js";
import AuthorContent from "./AuthorContent.js";
import { viewAuthor } from "../../../utils/queries";

export default function AuthorView(props) {
  const [author, setAuthor] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await viewAuthor(props.match.params.uid);
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
        bio: author.data.bio,
      };

      const authorContentData = {
        id: author.id,
      };

      return (
        <>
          <AuthorCover {...authorCoverData} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <AuthorContent {...authorContentData} />
        </>
      );
    }
    return <></>;
  };

  return <>{renderAuthor()}</>;
}

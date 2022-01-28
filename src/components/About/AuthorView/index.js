import React from "react";
import AuthorCover from "./AuthorCover.js";
import AuthorContent from "./AuthorContent.js";
import { viewAuthor } from "../../../utils/queries";
import { formatAuthorCover } from "../../../utils/formatters";

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
      const authorContentData = {
        id: author.id,
      };

      return (
        <>
          <AuthorCover {...formatAuthorCover(author)} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <AuthorContent {...authorContentData} />
        </>
      );
    }
    return <></>;
  };

  return <>{renderAuthor()}</>;
}

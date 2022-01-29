import React from "react";
import AuthorCover from "./AuthorCover.js";
import AuthorContent from "./AuthorContent.js";
import { viewAuthor } from "../../../utils/queries";
import { formatAuthorCover } from "../../../utils/formatters";
import Error404 from "../../Error404/index.js";

export default function AuthorView(props) {
  const [author, setAuthor] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await viewAuthor(props.match.params.uid);
      if (response) {
        setAuthor(response.results[0]);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [props.match.params.uid]);

  const renderAuthor = () => {
    if (author) {
      return (
        <>
          <AuthorCover {...formatAuthorCover(author)} />
          <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
          <AuthorContent {...author} />
        </>
      );
    }
    return (
      <>
        <Error404></Error404>
      </>
    );
  };

  return <>{!isLoading && renderAuthor()}</>;
}

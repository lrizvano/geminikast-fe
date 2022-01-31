import React from "react";
import DocumentHeader from "./DocumentHeader.js";
import DocumentBody from "./DocumentBody.js";
import DocumentFooter from "./DocumentFooter.js";
import { viewDocument } from "../../../utils/queries";
import {
  formatDocumentHeaderData,
  formatDocumentBodyData,
} from "../../../utils/formatters";
import Error404 from "../../Error404/index.js";
import Divider from "../../common/Divider.js";

export default function ArticleView(props) {
  const [document, setDocument] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await viewDocument(props.type, props.match.params.uid);
      if (response) {
        setDocument(response.results[0]);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [props.match.params.uid]);

  const renderDocument = () => {
    if (document) {
      return (
        <>
          <DocumentHeader {...formatDocumentHeaderData(document)} />
          <Divider />
          <DocumentBody
            type={props.type}
            {...formatDocumentBodyData(document)}
          />
          <Divider />
          <DocumentFooter {...document.data.author} />
          <Divider />
        </>
      );
    }
    return (
      <>
        <Error404></Error404>
      </>
    );
  };

  return <>{!isLoading && renderDocument()}</>;
}

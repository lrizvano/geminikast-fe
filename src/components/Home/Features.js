import React from "react";
import TileCard from "../templates/TileCard.js";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { formatTileData } from "../../utils/formatters.js";
import { documentTypes, featureDocuments } from "../../utils/queries";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`;

export default function Features(props) {
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await featureDocuments(props.type);
      if (response) {
        setDocuments(response.results);
      }
    };
    fetchData();
  }, [props.type]);

  const renderFeatures = () =>
    documents.map((doc) => <TileCard {...formatTileData(doc)} />);

  return (
    <>
      <h3 className="text-primary mb-3">
        Latest {documentTypes[props.type].name}
      </h3>
      <Row>{renderFeatures()}</Row>
      <Wrapper>
        <Button
          className="align-content-center"
          variant="secondary"
          href={documentTypes[props.type].link}
        >
          {`See All ${documentTypes[props.type].name}`}
        </Button>
      </Wrapper>
    </>
  );
}

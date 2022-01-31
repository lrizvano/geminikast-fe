import React from "react";
import TileCard from "../templates/TileCard.js";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { formatTileData } from "../../utils/formatters.js";
import { documentTypes, featureDocuments } from "../../utils/queries";
import { sortList } from "../../utils/filters.js";

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
      <Jumbotron className="bg-secondary text-info">
        <h1 className="font-weight-bold">
          {sortList[props.type][Object.keys(sortList[props.type])[0]].title}{" "}
          {documentTypes[props.type].name}
        </h1>
        <h2>{documentTypes[props.type].description}</h2>
      </Jumbotron>
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

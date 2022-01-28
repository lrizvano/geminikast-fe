import React from "react";
import ContentRow from "./ContentRow.js";
import { formatRowData } from "../utils/formatters.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useHistory } from "react-router-dom";
import { listDocuments, listFilteredDocuments } from "../utils/queries";
import { platformList, sortList, updateHistory } from "../utils/filters.js";
import DropdownHover from "./styled/DropdownHover.js";

export default function ContentList(props) {
  const [documents, setDocuments] = React.useState([]);
  const search = useLocation().search;
  const platformParam = new URLSearchParams(search).get("platform");
  const sortParam = new URLSearchParams(search).get("sort");
  const [platformKey, setPlatformKey] = React.useState(
    platformParam || Object.keys(platformList)[0]
  );
  const [sortKey, setSortKey] = React.useState(
    sortParam || Object.keys(sortList[props.type])[0]
  );
  let history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platformKey !== Object.keys(platformList)[0]) {
        response = await listFilteredDocuments(
          props.type,
          platformKey,
          sortList[props.type][sortKey].query
        );
      } else {
        response = await listDocuments(
          props.type,
          sortList[props.type][sortKey].query
        );
      }
      if (response) {
        setDocuments(response.results);
      }
    };
    updateHistory(history, platformKey, sortKey, props.type);
    fetchData();
  }, [history, platformKey, sortKey, props.type]);

  const renderDocuments = () =>
    documents.length === 0 ? (
      <p>No results found.</p>
    ) : (
      documents.map((doc) => <ContentRow {...formatRowData(doc)} />)
    );

  const renderDropdownItems = (filter) => {
    let dropdownItems = [];
    Object.entries(
      filter === "platform" ? platformList : sortList[props.type]
    ).forEach(([key, value]) => {
      dropdownItems.push(
        <DropdownHover>
          <Dropdown.Item className="text-info" eventKey={key}>
            {filter === "platform" ? value : value.title}
          </Dropdown.Item>
        </DropdownHover>
      );
    });
    return dropdownItems;
  };

  const renderDropdown = (filter) => {
    return (
      <Col xs="auto">
        <Dropdown
          onSelect={filter === "platform" ? setPlatformKey : setSortKey}
        >
          <Dropdown.Toggle variant="secondary">
            {filter === "platform"
              ? platformList[platformKey]
              : sortList[props.type][sortKey].title}
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-dark">
            {renderDropdownItems(filter)}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    );
  };

  return (
    <>
      <h1 className="mt-5 mb-3 text-primary">
        {`${sortList[props.type][sortKey].title} ${
          platformKey === Object.keys(platformList)[0]
            ? ""
            : platformList[platformKey]
        }`}{" "}
        {props.type === "review" ? "Reviews" : "News"}
      </h1>
      <Row className="mb-3">
        {renderDropdown("platform")}
        {renderDropdown("sort")}
      </Row>
      {renderDocuments()}
    </>
  );
}

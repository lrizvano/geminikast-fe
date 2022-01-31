import React from "react";
import RowCard from "../templates/RowCard.js";
import { formatRowData } from "../../utils/formatters.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useHistory } from "react-router-dom";
import {
  documentTypes,
  listDocuments,
  listFilteredDocuments,
} from "../../utils/queries";
import { filterFields, updateHistory } from "../../utils/filters.js";
import DropdownHover from "../styled/DropdownHover.js";

export default function DocumentList(props) {
  const [documents, setDocuments] = React.useState([]);
  const search = useLocation().search;
  const platformParam = new URLSearchParams(search).get("platform");
  const sortParam = new URLSearchParams(search).get("sort");
  const [platformKey, setPlatformKey] = React.useState(
    platformParam || Object.keys(filterFields.platform)[0]
  );
  const [sortKey, setSortKey] = React.useState(
    sortParam || Object.keys(filterFields.sort[props.type])[0]
  );
  let history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (platformKey !== Object.keys(filterFields.platform)[0]) {
        response = await listFilteredDocuments(
          props.type,
          platformKey,
          filterFields.sort[props.type][sortKey].query
        );
      } else {
        response = await listDocuments(
          props.type,
          filterFields.sort[props.type][sortKey].query
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
      documents.map((doc) => <RowCard {...formatRowData(doc)} />)
    );

  const renderDropdownItems = (filter) => {
    let dropdownItems = [];
    Object.entries(
      filter === "platform"
        ? filterFields.platform
        : filterFields.sort[props.type]
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
              ? filterFields.platform[platformKey]
              : filterFields.sort[props.type][sortKey].title}
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
      <h1 className="mb-3 text-primary">
        {`${filterFields.sort[props.type][sortKey].title} ${
          platformKey === Object.keys(filterFields.platform)[0]
            ? ""
            : filterFields.platform[platformKey]
        }`}{" "}
        {documentTypes[props.type].name}
      </h1>
      <Row className="mb-3">
        {renderDropdown("platform")}
        {renderDropdown("sort")}
      </Row>
      {renderDocuments()}
    </>
  );
}

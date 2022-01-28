import React from "react";
import ContentRow from "./ContentRow.js";
import { formatDate } from "../utils/utils.js";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useHistory } from "react-router-dom";
import { listDocuments, listFilteredDocuments } from "../utils/queries";
import { RichText, Date } from "prismic-reactjs";
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

  const renderDocuments = () => {
    return documents.map((doc) => {
      const contentRowData = {
        link: `${props.type === "review" ? "reviews" : "news"}/${doc.uid}`,
        image: doc.data.image.url,
        title:
          props.type === "review"
            ? RichText.asText(doc.data.game)
            : RichText.asText(doc.data.headline),
        author: RichText.asText(doc.data.author.data.name),
        date: formatDate(Date(doc.data.date)),
      };
      return <ContentRow {...contentRowData} />;
    });
  };

  const renderPlatformItems = () => {
    let platformItems = [];
    Object.entries(platformList).forEach(([key, value]) => {
      platformItems.push(
        <DropdownHover>
          <Dropdown.Item className="text-info" eventKey={key}>
            {value}
          </Dropdown.Item>
        </DropdownHover>
      );
    });
    return platformItems;
  };

  const renderSortItems = () => {
    let sortItems = [];
    Object.entries(sortList[props.type]).forEach(([key, value]) => {
      sortItems.push(
        <DropdownHover>
          <Dropdown.Item className="text-info" eventKey={key}>
            {value.title}
          </Dropdown.Item>
        </DropdownHover>
      );
    });
    return sortItems;
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
        <Col xs="auto">
          <Dropdown onSelect={setPlatformKey}>
            <Dropdown.Toggle variant="secondary">
              {platformList[platformKey]}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark">
              {renderPlatformItems()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Dropdown onSelect={setSortKey}>
            <Dropdown.Toggle variant="secondary">
              {sortList[props.type][sortKey].title}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark">
              {renderSortItems()}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {documents.length === 0 ? <p>No results found.</p> : renderDocuments()}
    </>
  );
}

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IconContext } from "react-icons";
import { SiPlaystation, SiXbox, SiNintendo } from "react-icons/si";
import {
  FaKeyboard,
  FaFilm,
  FaDesktop,
  FaBookOpen,
  FaDiceD20,
} from "react-icons/fa";

const platformList = {
  playstation: <SiPlaystation />,
  xbox: <SiXbox />,
  nintendo: <SiNintendo />,
  pc: <FaKeyboard />,
  movies: <FaFilm />,
  shows: <FaDesktop />,
  comics: <FaBookOpen />,
  tabletop: <FaDiceD20 />,
};

export default function PlatformIcons(props) {
  const platformIcons = [];
  const renderPlatformIcons = () => {
    for (var index in props) {
      platformIcons.push(
        <Col xs="2" lg="1">
          <IconContext.Provider value={{ size: "1.5em" }}>
            {platformList[props[index].platform]}
          </IconContext.Provider>
        </Col>
      );
    }
    return platformIcons;
  };

  return <Row>{renderPlatformIcons()}</Row>;
}

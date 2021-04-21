import React from "react";
import Container from "react-bootstrap/Container";

export default function DateFormatter(props) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(props.date);

  return <>{formattedDate}</>;
}

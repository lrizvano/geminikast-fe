import React from "react";

export default function DateFormat(props) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(props.date);

  return <>{formattedDate}</>;
}

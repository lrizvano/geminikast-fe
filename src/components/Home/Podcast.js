import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Podcast() {
  return (
    <>
      <h3 className="text-primary">Newest Episode</h3>
      <iframe
        title="podcast"
        src="https://open.spotify.com/embed-podcast/show/77QfKMGg067YXiJnb1Ic3q"
        width="100%"
        height="232"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </>
  );
}

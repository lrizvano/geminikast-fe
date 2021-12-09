import React from "react";

export default function Podcast() {
  return (
    <>
      <h3 className="text-primary mt-5 mb-3">Newest Episode</h3>
      <iframe
        title="podcast"
        src="https://open.spotify.com/embed-podcast/show/77QfKMGg067YXiJnb1Ic3q"
        width="100%"
        height="232"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
    </>
  );
}

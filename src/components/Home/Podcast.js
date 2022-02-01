import React from "react";

export default function Podcast() {
  return (
    <>
      <h1 className="text-info font-weight-bold">Latest Podcast</h1>
      <h2 className="mb-3">Games, Tech, and Movie Discussions!</h2>
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

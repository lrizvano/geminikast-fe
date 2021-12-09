import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";

export default function Home() {
  return (
    <>
      <Features className="ml-3 mr-3" />
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <Podcast />
    </>
  );
}

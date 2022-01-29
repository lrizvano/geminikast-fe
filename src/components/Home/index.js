import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";
import Divider from "../common/Divider.js";

export default function Home() {
  return (
    <>
      <Podcast />
      <Divider />
      <Features type="review" />
      <Divider />
      <Features type="article" />
      <Divider />
    </>
  );
}

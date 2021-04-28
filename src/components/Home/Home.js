import React from "react";
import Podcast from "./Podcast.js";
import Features from "./Features.js";

export default function Home() {
  return (
    <>
      <h1 className="mt-3 text-primary">Features</h1>
      <Features />

      <h1 className="mt-3 text-primary">Newest Episode</h1>
      <Podcast />
    </>
  );
}

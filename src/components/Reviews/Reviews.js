import React from "react";
import ReviewList from "./ReviewList.js";

export default function Reviews() {
  return (
    <>
      <h1 className="mt-3 text-primary">Reviews</h1>
      <hr className="bg-primary ml-3 mr-3 mt-5 mb-5" />
      <ReviewList />
    </>
  );
}

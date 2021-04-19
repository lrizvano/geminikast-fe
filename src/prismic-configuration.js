import Prismic from "@prismicio/client";

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
export const apiEndpoint = "https://geminikast-cms.cdn.prismic.io/api/v2";

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken =
  "MC5ZSE9jUmhNQUFDQUFub2Qz.GO-_ve-_ve-_vV7vv73vv70m77-977-977-977-977-977-977-977-977-977-9civvv73vv73vv73vv73vv70Q77-9HUB_77-977-9";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === "article") return `/article/${doc.uid}`;
  if (doc.type === "review") return `/review/${doc.uid}`;
  if (doc.type === "author") return `/author/${doc.uid}`;
  return "/";
};

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken });

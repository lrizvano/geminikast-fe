import Prismic from "@prismicio/client";
import { Elements } from "prismic-richtext";
import React from "react";

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

// -- Function to add unique key to props
const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};

// -- HTML Serializer
// This function will be used to change the way the HTML is loaded
export const htmlSerializer = function (type, element, content, children, key) {
  var props = {};

  switch (type) {
    // Add a class to paragraph elements
    case Elements.paragraph:
      props = { className: "paragraph-class" };
      return React.createElement("p", propsWithUniqueKey(props, key), children);

    // Don't wrap images in a <p> tag
    case Elements.image:
      props = { src: element.url, alt: element.alt || "" };
      return React.createElement("img", propsWithUniqueKey(props, key));

    // Add a class to hyperlinks
    case Elements.hyperlink:
      const targetAttr = element.data.target
        ? { target: element.data.target }
        : {};
      const relAttr = element.data.target ? { rel: "noopener" } : {};
      props = Object.assign(
        {
          className: "link-class",
          href: element.data.url || linkResolver(element.data),
        },
        targetAttr,
        relAttr
      );
      return React.createElement("a", propsWithUniqueKey(props, key), children);

    // Return null to stick with the default behavior
    default:
      return null;
  }
};

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken });

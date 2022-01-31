import { RichText, Date } from "prismic-reactjs";
import { documentTypes } from "./queries";

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

//used in home and author pages
export const formatTileData = (doc) => {
  return {
    link: `${documentTypes[doc.type].link}/${doc.uid}`,
    image: doc.data.image.url,
    title: RichText.asText(doc.data[documentTypes[doc.type].title]),
    text: formatDate(Date(doc.data.date)),
  };
};

//used in document list
export const formatRowData = (doc) => {
  return {
    link: `${documentTypes[doc.type].link}/${doc.uid}`,
    image: doc.data.image.url,
    title: RichText.asText(doc.data[documentTypes[doc.type].title]),
    author: RichText.asText(doc.data.author.data.name),
    date: formatDate(Date(doc.data.date)),
    platforms: doc.data.platforms,
  };
};

//used in about page
export const formatAuthorData = (author) => {
  return {
    uid: author.uid,
    image: author.data.image.url,
    name: RichText.asText(author.data.name),
    role: RichText.asText(author.data.role),
  };
};

//used in document view
export const formatDocumentHeaderData = (doc) => {
  return {
    image: doc.data.image.url,
    title: RichText.asText(doc.data[documentTypes[doc.type].title]),
    uid: doc.data.author.uid,
    name: RichText.asText(doc.data.author.data.name),
    date: Date(doc.data.date),
  };
};

//used in review view
export const formatDocumentBodyData = (review) => {
  return {
    body: review.data.body,
    score: review.data.score,
    summary: RichText.asText(review.data.summary),
  };
};

//used in author view
export const formatAuthorCover = (author) => {
  return {
    image: author.data.image.url,
    name: RichText.asText(author.data.name),
    role: RichText.asText(author.data.role),
    bio: author.data.bio,
  };
};

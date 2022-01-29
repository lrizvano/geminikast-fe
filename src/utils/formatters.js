import { RichText, Date } from "prismic-reactjs";

export const documentTypes = {
  article: {
    title: "News",
    link: "/news",
  },
  review: {
    title: "Reviews",
    link: "/reviews",
  },
};

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
    link: `/${doc.type === "article" ? "new" : doc.type}s/${doc.uid}`,
    image: doc.data.image.url,
    title: RichText.asText(
      doc.type === "article" ? doc.data.headline : doc.data.game
    ),
    text: formatDate(Date(doc.data.date)),
  };
};

//used in article and news list
export const formatRowData = (doc) => {
  return {
    link: `/${doc.type === "article" ? "new" : doc.type}s/${doc.uid}`,
    image: doc.data.image.url,
    title: RichText.asText(
      doc.type === "review" ? doc.data.game : doc.data.headline
    ),
    author: RichText.asText(doc.data.author.data.name),
    date: formatDate(Date(doc.data.date)),
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

//used in article and review view
export const formatContentCover = (document) => {
  return {
    image: document.data.image.url,
    title: RichText.asText(
      document.type === "article" ? document.data.headline : document.data.game
    ),

    uid: document.data.author.uid,
    name: RichText.asText(document.data.author.data.name),
    date: Date(document.data.date),
  };
};

//used in review view
export const formatReviewBody = (review) => {
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

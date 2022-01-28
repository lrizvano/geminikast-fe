import { RichText, Date } from "prismic-reactjs";

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
    link: doc.type === "article" ? `news/${doc.uid}` : `reviews/${doc.uid}`,
    image: doc.data.image.url,
    title:
      doc.type === "article"
        ? RichText.asText(doc.data.headline)
        : RichText.asText(doc.data.game),
    text: formatDate(Date(doc.data.date)),
  };
};

//used in article and news list
export const formatRowData = (doc) => {
  return {
    link: `${doc.type === "review" ? "reviews" : "news"}/${doc.uid}`,
    image: doc.data.image.url,
    title:
      doc.type === "review"
        ? RichText.asText(doc.data.game)
        : RichText.asText(doc.data.headline),
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
export const formatDocumentCover = (document) => {
  return {
    image: document.data.image.url,
    title:
      document.type === "article"
        ? RichText.asText(document.data.headline)
        : `${RichText.asText(document.data.game)} Review`,
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

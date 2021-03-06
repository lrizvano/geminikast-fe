import Prismic from "@prismicio/client";
import { client } from "../prismic-configuration.js";

export const documentTypes = {
  article: {
    name: "News",
    link: "/news",
    title: "headline",
    description:
      "See what's new surrounding the video game and entertainment world!",
  },
  review: {
    name: "Reviews",
    link: "/reviews",
    title: "game",
    description:
      "Check out all of our reviews and impressions of the latest games, movies, shows, and more!",
  },
};

//used on home page
export const featureDocuments = (type) =>
  client.query(Prismic.Predicates.at("document.type", type), {
    fetchLinks: "author.name",
    orderings: `[my.${type}.date desc]`,
    pageSize: 6,
  });

//used on reviews and news pages
export const listDocuments = (type, sort) =>
  client.query(Prismic.Predicates.at("document.type", type), {
    fetchLinks: "author.name",
    orderings: sort,
  });
export const listFilteredDocuments = (type, platform, sort) =>
  client.query(
    [
      Prismic.Predicates.at("document.type", type),
      Prismic.Predicates.at(`my.${type}.platforms.platform`, platform),
    ],
    { fetchLinks: "author.name", orderings: sort }
  );

//used on reviews/:uid and news/:uid pages
export const viewDocument = (type, uid) =>
  client.query(Prismic.Predicates.at(`my.${type}.uid`, uid), {
    fetchLinks: "author.name",
  });
export const viewDocumentAuthor = (id) =>
  client.query(Prismic.Predicates.at("my.author.uid", id), {
    lang: "*",
  });

//used on about page
export const listAuthors = () =>
  client.query(Prismic.Predicates.at("document.type", "author"), {
    orderings: "[my.author.index]",
  });

//used on about/:uid pages
export const viewAuthor = (uid) =>
  client.query(Prismic.Predicates.at("my.author.uid", uid), { lang: "*" });
export const listAuthorDocuments = (type, id) =>
  client.query([
    Prismic.Predicates.at("document.type", type),
    Prismic.Predicates.at(`my.${type}.author`, id),
  ]);

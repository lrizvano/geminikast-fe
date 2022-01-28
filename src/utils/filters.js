export const platformList = {
  "all-platforms": "All Platforms",
  playstation: "Playstation",
  xbox: "Xbox",
  nintendo: "Nintendo",
  pc: "PC",
  movies: "Movie",
  shows: "Show",
  comics: "Comic",
  tabletop: "Tabletop",
};

export const sortList = {
  review: {
    latest: {
      title: "Latest",
      query: "[my.review.date desc]",
    },
    oldest: {
      title: "Oldest",
      query: "[my.review.date]",
    },
    "highest-rated": {
      title: "Highest Rated",
      query: "[my.review.score desc]",
    },
    "lowest-rated": {
      title: "Lowest Rated",
      query: "[my.review.score]",
    },
    "a-z": {
      title: "A-Z",
      query: "[my.review.game]",
    },
    "z-a": {
      title: "Z-A",
      query: "[my.review.game desc]",
    },
  },
  article: {
    latest: {
      title: "Latest",
      query: "[my.article.date desc]",
    },
    oldest: {
      title: "Oldest",
      query: "[my.article.date]",
    },
    "a-z": {
      title: "A-Z",
      query: "[my.article.headline]",
    },
    "z-a": {
      title: "Z-A",
      query: "[my.article.headline desc]",
    },
  },
};

export const updateHistory = async (history, platform, sort, type) => {
  const queryUrl = new URL("uri:/");
  if (platform !== Object.keys(platformList)[0]) {
    queryUrl.searchParams.append("platform", platform);
  }
  if (sort !== Object.keys(sortList[type])[0]) {
    queryUrl.searchParams.append("sort", sort);
  }
  history.push({
    search: queryUrl.search,
  });
};

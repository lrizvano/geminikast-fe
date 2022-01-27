export const platformList = [
  "All Platforms",
  "Playstation",
  "Xbox",
  "Nintendo",
  "PC",
  "Movies",
  "Shows",
  "Comics",
  "Tabletop",
];

export const reviewSort = {
  Latest: "[my.review.date desc]",
  Oldest: "[my.review.date]",
  Best: "[my.review.score desc]",
  Worst: "[my.review.score]",
  "A-Z": "[my.review.game]",
  "Z-A": "[my.review.game desc]",
};

export const articleSort = {
  Latest: "[my.article.date desc]",
  Oldest: "[my.article.date]",
  "A-Z": "[my.article.headline]",
  "Z-A": "[my.article.headline desc]",
};

export const formatParam = (param) => {
  if (param === "all-platforms") {
    return "All Platforms";
  }
  if (param === "pc") {
    return "PC";
  }
  if (param === "a-z") {
    return "A-Z";
  }
  return param?.charAt(0).toUpperCase() + param?.slice(1);
};

export const updateHistory = async (history, platform, sort) => {
  if (platform === "All Platforms" && sort === "Latest") {
    history.push({
      search: ``,
    });
  } else if (platform !== "All Platforms" && sort !== "Latest") {
    history.push({
      search: `?platform=${platform.toLowerCase()}&sort=${sort.toLowerCase()}`,
    });
  } else if (platform !== "All Platforms") {
    history.push({
      search: `?platform=${platform.toLowerCase()}`,
    });
  } else if (sort !== "Latest") {
    history.push({
      search: `?sort=${sort.toLowerCase()}`,
    });
  }
};

export const formatPlatform = (platform) => {
  if (platform === "All Platforms") {
    return "";
  }
  if (platform.endsWith("s")) {
    return platform.slice(0, -1);
  }
  return platform;
};

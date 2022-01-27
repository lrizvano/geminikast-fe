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
  "Highest Rated": "[my.review.score desc]",
  "Lowest Rated": "[my.review.score]",
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
  platform = platform.toLowerCase();
  sort = sort.replace(" ", "-").toLowerCase();
  if (platform === "all platforms" && sort === "latest") {
    history.push({
      search: ``,
    });
  } else if (platform !== "all platforms" && sort !== "latest") {
    history.push({
      search: `?platform=${platform}&sort=${sort}`,
    });
  } else if (platform !== "all platforms") {
    history.push({
      search: `?platform=${platform}`,
    });
  } else if (sort !== "latest") {
    history.push({
      search: `?sort=${sort}`,
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

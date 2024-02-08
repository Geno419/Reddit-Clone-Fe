export const handleSortOrderChange = (setSortOrder, sortOrder) => {
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};

export const handleSortCriteriaChange = (event, setSortCriteria) => {
  setSortCriteria(event.target.value);
};

export const sortArticles = (articles, sortCriteria, sortOrder) => {
  switch (sortCriteria) {
    case "date":
      return articles.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    case "comment_count":
      return articles.sort((a, b) =>
        sortOrder === "asc"
          ? a.comment_count - b.comment_count
          : b.comment_count - a.comment_count
      );
    case "votes":
      return articles.sort((a, b) =>
        sortOrder === "asc" ? a.votes - b.votes : b.votes - a.votes
      );
    default:
      return articles;
  }
};

export function handleTopicChange(event, navigate) {
  const path = event.target.value;
  if (path === "/") {
    navigate(`/`);
  } else {
    navigate(`/${path}`);
  }
  window.location.reload();
}

export function formatDate(newDate) {
  const date = new Date(newDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `Posted on the ${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year} at ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return formattedTime;
}

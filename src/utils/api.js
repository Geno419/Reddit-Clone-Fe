import axios from "axios";

const myApi = axios.create({
  baseURL: "https://reddit-clone-scv5.onrender.com/api",
});

export const fetchAllArticles = () => {
  return myApi.get(`/articles`).then((res) => {
    return res.data.articles;
  });
};

export const fetchCommentsByArticles = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

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

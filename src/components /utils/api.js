import axios from "axios";

const myApi = axios.create({
  baseURL: "https://reddit-clone-scv5.onrender.com/api",
});

export const fetchAllArticles = () => {
  return myApi.get(`/articles`).then((res) => {
    return res.data.articles;
  });
};

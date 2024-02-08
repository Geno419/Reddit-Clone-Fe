import axios from "axios";

const myApi = axios.create({
  baseURL: "https://reddit-clone-scv5.onrender.com/api",
});

export const fetchAllArticles = () => {
  return myApi.get(`/articles`).then((res) => {
    return res.data.articles;
  });
};

export const fetchArticlesWithTopic = (topic) => {
  return myApi.get(`/articles?topic=${topic}`).then((res) => {
    return res.data.articles;
  });
};

export const fetchCommentsByArticleId = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const fetchArticleByArticleId = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then((res) => {
    return res.data;
  });
};

export const patchVoteByID = (article_id, IncrementByObj) => {
  return myApi.patch(`/articles/${article_id}`, IncrementByObj).then((res) => {
    return res.data.votes;
  });
};

export const fetchAllTopics = () => {
  return myApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export const fetchUsers = () => {
  return myApi.get(`/users`).then((res) => {
    return res.data.users;
  });
};
export const postComment = (article_id, newComment) => {
  return myApi.post(`/articles/${article_id}/comments`, newComment);
};
export const removeCommentFromDB = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`);
};

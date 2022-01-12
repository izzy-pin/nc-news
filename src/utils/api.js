import axios from "axios";

const newsRnApi = axios.create({
  baseURL: "https://newsrn.herokuapp.com/api",
});

export const getTopics = () => {
  return newsRnApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (topic) => {
  let path = "/articles";
  if (topic) {
    path += `?topic=${topic}`;
  }
  return newsRnApi.get(path).then((res) => {
    return res.data.articles;
  });
};

export const getArticleByArticleId = (id) => {
  return newsRnApi.get(`/articles/${id}`).then((res) => {
    return res.data.article;
  });
};

export const getComments = (id) => {
  return newsRnApi.get(`/articles/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchArticleVote = (id, inc) => {
  return newsRnApi.patch(`/articles/${id}`, { inc_votes: inc }).then((res) => {
    return res.data.article;
  });
};

export const patchCommentVote = (id, inc) => {
  return newsRnApi.patch(`/comments/${id}`, { inc_votes: inc }).then((res) => {
    return res.data.comment;
  });
};

export const getUserByUsername = (username) => {
  return newsRnApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

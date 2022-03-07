import axios from "axios";

const newsRnApi = axios.create({
  baseURL: "https://newsrn.herokuapp.com/api",
});

export const getTopics = () => {
  return newsRnApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (topic, sort_by, order, p) => {
  return newsRnApi
    .get("/articles", {
      params: { topic, sort_by, order, p },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const getArticleByArticleId = (article_id) => {
  return newsRnApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getArticlesByUser = (author, sort_by, order, p) => {
  return newsRnApi
    .get("/articles", {
      params: { author, sort_by, order, p },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const getComments = (article_id, p = 1, limit = 10) => {
  return newsRnApi
    .get(`/articles/${article_id}/comments`, {
      params: { p, limit },
    })
    .then((res) => {
      return res.data.comments;
    });
};

export const patchVote = (id, inc, componentPath) => {
  return newsRnApi
    .patch(`/${componentPath}/${id}`, { inc_votes: inc })
    .then((res) => {
      return res.data.comment;
    });
};

export const getUserByUsername = (username) => {
  return newsRnApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const postComment = (article_id, data) => {
  return newsRnApi
    .post(`/articles/${article_id}/comments`, data)
    .then((res) => {
      return res.data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return newsRnApi.delete(`/comments/${comment_id}`);
};

export const capitaliseStr = (topic) => {
  return topic.charAt(0).toUpperCase() + topic.slice(1);
};

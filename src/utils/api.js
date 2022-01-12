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

export const getArticleByArticleId = (article_id) => {
  return newsRnApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getComments = (article_id) => {
  return newsRnApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchArticleVote = (article_id, inc) => {
  return newsRnApi
    .patch(`/articles/${article_id}`, { inc_votes: inc })
    .then((res) => {
      return res.data.article;
    });
};

export const patchCommentVote = (comment_id, inc) => {
  return newsRnApi
    .patch(`/comments/${comment_id}`, { inc_votes: inc })
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

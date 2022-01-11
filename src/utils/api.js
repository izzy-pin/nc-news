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

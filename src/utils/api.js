import axios from "axios";

const newsRnApi = axios.create({
  baseURL: "https://newsrn.herokuapp.com/api",
});

export const getTopics = () => {
  return newsRnApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

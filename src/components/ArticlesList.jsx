import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortByValue, setSortByValue] = useState("created_at");
  const [sort_by, setSort_by] = useState(undefined);
  const [orderValue, setOrderValue] = useState("desc");
  const [order, setOrder] = useState(undefined);

  //destructure topic from the params obj
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(topic, sort_by, order)
      .then((articlesFromApi) => {
        setIsLoading(false);
        setArticles(articlesFromApi);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err.response.data.msg);
        console.log(err.response.status);
      });
  }, [topic, sort_by, order]);

  const handleSortByChange = (event) => {
    setSortByValue(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrderValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSort_by(sortByValue);
    setOrder(orderValue);
  };

  return (
    <main>
      <h1>{topic ? topic : "all topics"} </h1>
      <section className="SortBy__Section">
        <h2>Sort by:</h2>
        <form onSubmit={handleSubmit}>
          <select
            className="ArticleListSort__select"
            defaultValue={sortByValue}
            onChange={handleSortByChange}
          >
            {" "}
            <option value="created_at">Date posted</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Likes</option>
          </select>
          <select
            className="ArticleListOrder__select"
            defaultValue={orderValue}
            onChange={handleOrderChange}
          >
            {" "}
            <option value="desc">
              {sortByValue === "created_at"
                ? "newest to oldest"
                : "most to least popular"}
            </option>
            <option value="asc">
              {sortByValue === "created_at"
                ? "oldest to newest"
                : "least to most popular"}
            </option>
          </select>

          <button className="ArticleListSort__button">Go</button>
        </form>
      </section>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Sorry, there was an error</p>
      ) : (
        <ul className="ArticleList">
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default ArticlesList;

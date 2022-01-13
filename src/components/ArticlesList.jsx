import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import ArticlesPag from "./ArticlesPag";
import SortBy from "./SortBy";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ status: undefined, msg: "error" });

  const [sort_by, setSort_by] = useState(undefined);
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
        setError({ status: err.response.status, msg: err.response.data.msg });
      });
  }, [topic, sort_by, order]);

  return (
    <main>
      <h1>{topic ? topic : "all topics"} </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <section className="ErrorSection">
          <p>Sorry :( </p>
          <p>
            {error.status}, {error.msg}
          </p>
        </section>
      ) : (
        <>
          <SortBy setSort_by={setSort_by} setOrder={setOrder} />
          <ul className="ArticleList">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </ul>
          <ArticlesPag />
        </>
      )}
    </main>
  );
};

export default ArticlesList;

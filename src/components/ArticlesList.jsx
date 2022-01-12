import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //destructure topic from the params obj
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(topic)
      .then((articlesFromApi) => {
        setIsLoading(false);
        setArticles(articlesFromApi);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [topic]);

  return (
    <main>
      <h1>{topic ? topic : "all topics"} </h1>
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

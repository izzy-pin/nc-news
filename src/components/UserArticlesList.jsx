import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getArticlesByUser, getUserByUsername } from "../utils/api";
import ArticleCard from "./ArticleCard";

const UserArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: null,
    msg: "",
  });

  const { author } = useParams();

  useEffect(() => {
    setError(() => {
      return {
        status: null,
        msg: "",
      };
    });
    getArticlesByUser(author)
      .then((userArticlesFromAPI) => {
        setArticles(userArticlesFromAPI);
        console.log(articles);
      })
      .catch((err) => {
        setError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
  }, [author]);

  return (
    <>
      {error.status ? (
        <section className="ErrorSection">
          <h2>Sorry there was an error :( </h2>
          <p>
            {error.status}, {error.msg}
          </p>
          <div className="Error__HomeLink">
            <Link to={"/"}>
              Home <i className="fas fa-home"></i>
            </Link>
          </div>
        </section>
      ) : (
        <div>
          <h1>Articles by {author}</h1>
          <ul className="ArticleList">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserArticlesList;

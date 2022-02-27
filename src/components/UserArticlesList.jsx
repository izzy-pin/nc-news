import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getArticlesByUser, getUserByUsername } from "../utils/api";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "./LoadingSpinner";

const UserArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState({
    status: null,
    msg: "",
  });

  const { author } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(() => {
      return {
        status: null,
        msg: "",
      };
    });
    const userInfoFromApi = getUserByUsername(author);
    const userArticlesFromAPI = getArticlesByUser(author);
    Promise.all([userInfoFromApi, userArticlesFromAPI])
      .then(([userInfoFromApi, userArticlesFromAPI]) => {
        setUser(userInfoFromApi);
        setArticles(userArticlesFromAPI);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
  }, [author]);

  return (
    <>
      {isLoading ? (
        <section className="Loading__section">
          <p>*finding user...*</p>
          <LoadingSpinner />
        </section>
      ) : error.status ? (
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
          <div className="User__Div">
            <img
              className="User__img"
              src={user.avatar_url}
              alt="user profile pic"
            ></img>

            <p className="Username__p">{user.username}</p>
            <p className="UserFullName__p">{user.name}</p>
          </div>
          <h1>Articles by {author}</h1>
          {articles.length === 0 ? (
            <p>Looks like {user.username} hasn't posted any articles yet!</p>
          ) : (
            <ul className="ArticleList">
              {articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default UserArticlesList;

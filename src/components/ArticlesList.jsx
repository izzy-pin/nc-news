import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { capitaliseStr, getArticles, getArticlesByUser } from "../utils/api";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "./LoadingSpinner";
import SortBy from "./SortBy";

const PAGE_LENGTH = 10;

const ArticlesList = ({ author, setAuthorArticlesTotal }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: null,
    msg: "",
  });

  const { topic } = useParams();
  const [chosenTopic, setChosenTopic] = useState("");
  const [sort_by, setSort_by] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [p, setP] = useState(1);
  const [total_count, setTotal_count] = useState(null);

  if (topic !== chosenTopic) {
    setChosenTopic(topic);
    setP(1);
  }

  useEffect(() => {
    setIsLoading(true);
    setError((currentError) => {
      return {
        status: null,
        msg: "",
      };
    });

    if (author) {
      getArticlesByUser(author, sort_by, order, p).then(
        (userArticlesFromApi) => {
          setIsLoading(false);
          setArticles(userArticlesFromApi);
          setTotal_count(userArticlesFromApi[0].total_count);
          setAuthorArticlesTotal(userArticlesFromApi[0].total_count);
        }
      );
    } else {
      getArticles(topic, sort_by, order, p)
        .then((articlesFromApi) => {
          setIsLoading(false);
          setArticles(articlesFromApi);
          setTotal_count(articlesFromApi[0].total_count);
        })
        .catch((err) => {
          setIsLoading(false);
          setError({
            status: err.response.status,
            msg: err.response.data.msg,
          });
        });
    }
  }, [topic, sort_by, order, p, author, setAuthorArticlesTotal]);

  return (
    <main>
      {author ? null : <h1>{topic ? capitaliseStr(topic) : "All topics"} </h1>}
      {isLoading ? (
        <section className="Loading__section">
          <p>*shuffling newspapers...*</p>
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
        <section className="ArticlesList__Section">
          {total_count === 0 ? (
            <p>Sorry, no articles here (yet)</p>
          ) : (
            <>
              <SortBy
                setSort_by={setSort_by}
                sort_by={sort_by}
                setOrder={setOrder}
                order={order}
                setP={setP}
              />

              <ul className="ArticleList">
                {articles.map((article) => (
                  <ArticleCard key={article.article_id} article={article} />
                ))}
              </ul>
              <div className="Paginate__Div">
                <button
                  className="Paginate__button"
                  onClick={() => {
                    setP((currentPage) => currentPage - 1);
                  }}
                  disabled={p - 1 === 0}
                >
                  Prev
                </button>
                <button
                  className="Paginate__button"
                  onClick={() => {
                    setP((currentPage) => currentPage + 1);
                  }}
                  disabled={PAGE_LENGTH * p >= total_count}
                >
                  Next
                </button>
                <p>
                  Showing {p === 1 ? p : 1 + (p - 1) * 10} -{" "}
                  {PAGE_LENGTH * p <= total_count
                    ? PAGE_LENGTH * p
                    : total_count}{" "}
                  of {total_count} articles
                </p>
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default ArticlesList;

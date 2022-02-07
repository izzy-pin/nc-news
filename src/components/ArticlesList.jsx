import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import SortBy from "./SortBy";

const PAGE_LENGTH = 10;

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: null,
    msg: "",
  });

  //destructure topic from the params obj
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
  }, [topic, sort_by, order, p]);

  return (
    <main>
      <h1>{topic ? topic : "all topics"} </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error.status ? (
        <section className="ErrorSection">
          <p>Sorry there was an error :( </p>
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
          <SortBy
            setSort_by={setSort_by}
            sort_by={sort_by}
            setOrder={setOrder}
            order={order}
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
          </div>
        </section>
      )}
    </main>
  );
};

export default ArticlesList;

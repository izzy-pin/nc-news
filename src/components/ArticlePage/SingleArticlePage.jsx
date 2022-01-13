import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getArticleByArticleId } from "../../utils/api";
import SingleArticle from "./SingleArticle";

const SingleArticlePage = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: undefined, msg: "error" });

  const { article_id } = useParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getArticleByArticleId(article_id)
      .then((articleFromApi) => {
        setSingleArticle(articleFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setError({ status: err.response.status, msg: err.response.data.msg });
      });
  }, [article_id]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <section className="ErrorSection">
          <p>Sorry, there was an error :( </p>
          <p>
            {error.status}, {error.msg}
          </p>
        </section>
      ) : (
        <SingleArticle article={singleArticle} />
      )}
    </div>
  );
};

export default SingleArticlePage;

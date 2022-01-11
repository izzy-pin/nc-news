import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getArticleByArticleId } from "../../utils/api";
import SingleArticle from "./SingleArticle";

const SingleArticlePage = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getArticleByArticleId(article_id)
      .then((articleFromApi) => {
        setSingleArticle(articleFromApi);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  return (
    <div>
      {isError ? (
        <p>Sorry, we can't find that article</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <SingleArticle article={singleArticle} />
      )}
    </div>
  );
};

export default SingleArticlePage;

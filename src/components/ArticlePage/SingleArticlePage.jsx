import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByArticleId } from "../../utils/api";
import CommentList from "./Comment/CommentList";
import ArticleVotes from "./ArticleVotes";
import PostComment from "./Comment/PostComment";

const SingleArticlePage = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: undefined, msg: "error" });
  const createdDate = new Date(singleArticle.created_at);
  const [comments, setComments] = useState([]);

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
    <section className="SingleArticlePage__Section">
      {isLoading ? <p>Loading...</p> : null}
      {isError ? (
        <section className="ErrorSection">
          <p>Sorry, there was an error :( </p>
          <p>
            {error.status}, {error.msg}
          </p>
        </section>
      ) : (
        <main className="SingleArticle__main">
          <article className="SingleArticle__article">
            <p className="SingleArticle__topic">{singleArticle.topic}</p>
            <h2 className="SingleArticle__title">{singleArticle.title}</h2>
            <p className="SingleArticle__author">{singleArticle.author}</p>{" "}
            <p className="SingleArticle__date">{createdDate.toUTCString()}</p>
            <p className="SingleArticle__body">{singleArticle.body}</p>
            <div className="CommentVote__Div">
              <span>Comments: {singleArticle.comment_count}</span>{" "}
              <ArticleVotes article={singleArticle} />
            </div>
          </article>

          <PostComment
            article_id={singleArticle.article_id}
            setComments={setComments}
          />

          <CommentList comments={comments} setComments={setComments} />
        </main>
      )}
    </section>
  );
};

export default SingleArticlePage;

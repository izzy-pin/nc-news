import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { capitaliseStr, getArticleByArticleId } from "../../utils/api";
import CommentList from "./Comment/CommentList";
import PostComment from "./Comment/PostComment";
import Votes from "./Votes";
import LoadingSpinner from "../LoadingSpinner";

const SingleArticlePage = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: null, msg: "" });
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const createdDate = new Date(singleArticle.created_at);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(() => {
      return {
        status: null,
        msg: "",
      };
    });
    getArticleByArticleId(article_id)
      .then((articleFromApi) => {
        articleFromApi.topic = capitaliseStr(articleFromApi.topic);
        setSingleArticle(articleFromApi);
        setIsLoading(false);
        setCommentCount(articleFromApi.comment_count);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
  }, [article_id]);

  return (
    <section className="SingleArticlePage__Section">
      {isLoading ? (
        <section className="Loading__section">
          <p>*flipping pages to article...*</p>
          <LoadingSpinner />
        </section>
      ) : error.status ? (
        <section className="ErrorSection">
          <h2>Sorry, there was an error :( </h2>
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
        <main className="SingleArticle__main">
          <article className="SingleArticle__article">
            <p className="SingleArticle__topic">
              <Link to={`/topics/${singleArticle.topic}`}>
                {singleArticle.topic}
              </Link>
            </p>
            <h1 className="SingleArticle__title">{singleArticle.title}</h1>
            <p className="SingleArticle__author">
              <Link to={`/user/${singleArticle.author}`}>
                {singleArticle.author}
              </Link>
            </p>{" "}
            <p className="SingleArticle__date">{createdDate.toUTCString()}</p>
            <p className="SingleArticle__body">{singleArticle.body}</p>
            <div className="CommentVote__Div">
              <Votes
                votes={singleArticle.votes}
                id={article_id}
                componentPath={"articles"}
              />
              <p>Comments: {commentCount}</p>{" "}
            </div>
          </article>

          <PostComment
            article_id={singleArticle.article_id}
            setComments={setComments}
            setCommentCount={setCommentCount}
          />

          <CommentList
            comments={comments}
            setComments={setComments}
            setCommentCount={setCommentCount}
          />
        </main>
      )}
    </section>
  );
};

export default SingleArticlePage;

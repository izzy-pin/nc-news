import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleByArticleId } from "../../utils/api";
import CommentList from "./Comment/CommentList";
import PostComment from "./Comment/PostComment";
import Votes from "./Votes";

const SingleArticlePage = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: null, msg: "" });
  const [comments, setComments] = useState([]);

  const createdDate = new Date(singleArticle.created_at);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError((currentError) => {
      return {
        status: null,
        msg: "",
      };
    });
    getArticleByArticleId(article_id)
      .then((articleFromApi) => {
        setSingleArticle(articleFromApi);
        setIsLoading(false);
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
      {isLoading ? <p>Loading...</p> : null}
      {error.status ? (
        <section className="ErrorSection">
          <p>Sorry, there was an error :( </p>
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
            <p className="SingleArticle__topic">{singleArticle.topic}</p>
            <h2 className="SingleArticle__title">{singleArticle.title}</h2>
            <p className="SingleArticle__author">{singleArticle.author}</p>{" "}
            <p className="SingleArticle__date">{createdDate.toUTCString()}</p>
            <p className="SingleArticle__body">{singleArticle.body}</p>
            <div className="CommentVote__Div">
              <span>Comments: {singleArticle.comment_count}</span>{" "}
              <Votes votes={singleArticle.votes} id={article_id} />
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

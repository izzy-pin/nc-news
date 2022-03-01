import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../utils/api";
import CommentCard from "./CommentCard";

const CommentList = ({
  comments,
  setComments,
  setCommentCount,
  commentCount,
}) => {
  const { article_id } = useParams();

  const [error, setError] = useState({ status: null, msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [deletedComment, setDeletedComment] = useState(undefined);

  // need a page query
  const [nextPage, setNextPage] = useState(2);
  // possible to loadc more?
  const [loadMoreComments, setLoadMoreComments] = useState(true);

  const loadNextPageOfComments = (article_id, nextPage) => {
    getComments(article_id, nextPage)
      .then((nextPageofComments) => {
        setComments((currComments) => {
          if (
            currComments.length + nextPageofComments.length ===
            commentCount
          ) {
            setLoadMoreComments(false);
          }
          return [...currComments, ...nextPageofComments];
        });
        setNextPage((currNextPage) => currNextPage++);
      })
      .catch((err) => console.log(err));
  };

  const handleLoadMoreClick = () => {
    if (loadMoreComments) {
      loadNextPageOfComments(article_id, nextPage);
    }
  };

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError((currentError) => {
      return {
        status: null,
        msg: "",
      };
    });
    getComments(article_id)
      .then((commentsFromApi) => {
        if (isMounted) {
          setComments(commentsFromApi);
          setIsLoading(false);
          if (commentsFromApi.length === commentCount) {
            setLoadMoreComments(false);
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError({ status: err.response.status, msg: err.response.data.msg });
      });

    return () => {
      isMounted = false;
    };
  }, [article_id, setComments, deletedComment, commentCount]);
  return (
    <section className="Comment__Section">
      {isLoading ? (
        <p>Loading comments</p>
      ) : error.status ? (
        <section className="ErrorSection">
          <p>Sorry, there was an error :( </p>
          <p>
            {error.status}, {error.msg}
          </p>
        </section>
      ) : (
        <>
          <ul>
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  setDeletedComment={setDeletedComment}
                  setCommentCount={setCommentCount}
                />
              );
            })}
          </ul>
          <button
            onClick={handleLoadMoreClick}
            disabled={loadMoreComments === false}
          >
            Load More
          </button>
        </>
      )}
    </section>
  );
};

export default CommentList;

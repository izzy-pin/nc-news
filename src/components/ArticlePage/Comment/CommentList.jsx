import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../utils/api";
import LoadingSpinner from "../../LoadingSpinner";
import CommentCard from "./CommentCard";

const CommentList = ({
  comments,
  setComments,
  setCommentCount,
  commentCount,
}) => {
  const { article_id } = useParams();

  const [error, setError] = useState({
    comments: false,
    loadMoreComments: false,
    status: null,
    msg: "",
  });
  const [isLoading, setIsLoading] = useState({
    initialComments: false,
    moreComments: false,
  });
  const [deletedComment, setDeletedComment] = useState(undefined);

  const [nextPage, setNextPage] = useState(2);
  const [loadMoreComments, setLoadMoreComments] = useState(true);

  const loadNextPageOfComments = (article_id, nextPage) => {
    setIsLoading((currLoading) => {
      return { ...currLoading, moreComments: true };
    });
    setError(() => {
      return {
        comments: false,
        loadMoreComments: false,
        status: null,
        msg: "",
      };
    });
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
        setNextPage((currNextPage) => currNextPage + 1);
        setIsLoading((currLoading) => {
          return { ...currLoading, moreComments: false };
        });
      })
      .catch(() => {
        setIsLoading((currLoading) => {
          return { ...currLoading, moreComments: false };
        });
        setError((currErr) => {
          return { ...currErr, loadMoreComments: true };
        });
      });
  };

  const handleLoadMoreClick = () => {
    if (loadMoreComments) {
      loadNextPageOfComments(article_id, nextPage);
    }
  };

  useEffect(() => {
    let isMounted = true;

    setIsLoading((currLoading) => {
      return { ...currLoading, initialComments: true };
    });

    setError(() => {
      return {
        comments: false,
        loadMoreComments: false,
        status: null,
        msg: "",
      };
    });
    getComments(article_id)
      .then((commentsFromApi) => {
        if (isMounted) {
          setComments(commentsFromApi);
          setIsLoading((currLoading) => {
            return { ...currLoading, initialComments: false };
          });
          if (commentsFromApi.length === commentCount) {
            setLoadMoreComments(false);
          }
        }
      })
      .catch((err) => {
        setIsLoading((currLoading) => {
          return { ...currLoading, initialComments: false };
        });
        setError((currErr) => {
          return {
            ...currErr,
            comments: true,
            status: err.response.status,
            msg: err.response.data.msg,
          };
        });
      });

    return () => {
      isMounted = false;
    };
  }, [article_id, setComments, deletedComment, commentCount]);
  return (
    <section className="Comment__Section">
      {isLoading.initialComments ? (
        <>
          <p>Loading comment section</p>
          <LoadingSpinner />
        </>
      ) : error.status ? (
        <section className="Comments__Section__Error">
          <p>Sorry, there was an error loading comments :( </p>
          <p>Please try again later</p>
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
          {error.loadMoreComments ? (
            <>
              <p>Sorry, there was a problem loading more comments</p>
              <p>Please try again later</p>
            </>
          ) : null}
          {isLoading.moreComments ? <LoadingSpinner /> : null}
          {error.loadMoreComments ? null : (
            <button
              className="LoadComments__button"
              onClick={handleLoadMoreClick}
              disabled={loadMoreComments === false}
            >
              {loadMoreComments === false ? "All Comments Loaded" : "Load More"}
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default CommentList;

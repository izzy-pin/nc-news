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
  const [nextPage, setNextPage] = useState({ page: 2, moreToLoad: true });
  const [limit, setLimit] = useState(10);
  const p = 1;

  const handleLoadMoreClick = () => {
    setLimit((currLimit) => {
      return currLimit + 10;
    });
  };

  useEffect(() => {
    let isMounted = true;

    setIsLoading((currLoading) => {
      if (limit === 10) {
        return { ...currLoading, initialComments: true };
      } else {
        return { ...currLoading, moreComments: true };
      }
    });

    setError(() => {
      return {
        comments: false,
        loadMoreComments: false,
        status: null,
        msg: "",
      };
    });
    getComments(article_id, p, limit)
      .then((commentsFromApi) => {
        if (isMounted) {
          setComments(commentsFromApi);
          setIsLoading((currLoading) => {
            if (limit === 10) {
              return { ...currLoading, initialComments: false };
            } else {
              return { ...currLoading, moreComments: false };
            }
          });
          setNextPage((currNextPage) => {
            const canLoad = limit <= commentCount;
            return { ...currNextPage, moreToLoad: canLoad };
          });
        }
      })
      .catch((err) => {
        setIsLoading((currLoading) => {
          if (limit === 10) {
            return { ...currLoading, initialComments: false };
          } else {
            return { ...currLoading, moreComments: false };
          }
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
  }, [article_id, setComments, commentCount, p, limit]);
  return (
    <section className="Comment__Section">
      {isLoading.initialComments ? (
        <LoadingSpinner />
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
                  deletedComment={deletedComment}
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
          {error.loadMoreComments ? null : (
            <button
              className="LoadComments__button"
              onClick={handleLoadMoreClick}
              disabled={nextPage.moreToLoad === false}
            >
              {nextPage.moreToLoad === false
                ? "All Comments Loaded"
                : "Load More"}
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default CommentList;

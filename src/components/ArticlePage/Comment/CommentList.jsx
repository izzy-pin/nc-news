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

  const [error, setError] = useState({ status: null, msg: "" });
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
        setIsLoading((currLoading) => {
          return { ...currLoading, moreComments: false };
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading((currLoading) => {
          return { ...currLoading, moreComments: false };
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
        setError({ status: err.response.status, msg: err.response.data.msg });
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
          {isLoading.moreComments ? <LoadingSpinner /> : null}
          <button
            className="LoadComments__button"
            onClick={handleLoadMoreClick}
            disabled={loadMoreComments === false}
          >
            {loadMoreComments === false ? "All Comments Loaded" : "Load More"}
          </button>
        </>
      )}
    </section>
  );
};

export default CommentList;

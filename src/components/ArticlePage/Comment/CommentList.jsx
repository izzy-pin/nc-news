import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../utils/api";
import CommentCard from "./CommentCard";

const CommentList = ({ comments, setComments }) => {
  const { article_id } = useParams();

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ status: undefined, msg: "error" });
  const [isLoading, setIsLoading] = useState(false);
  const [deletedComment, setDeletedComment] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    setIsError(false);
    setIsLoading(true);
    getComments(article_id)
      .then((commentsFromApi) => {
        if (isMounted) {
          setComments(commentsFromApi);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        setError({ status: err.response.status, msg: err.response.data.msg });
      });
    return () => {
      isMounted = false;
    };
  }, [article_id, setComments, deletedComment]);
  return (
    <section className="Comment__Section">
      {isLoading ? (
        <p>Loading comments</p>
      ) : isError ? (
        <section className="ErrorSection">
          <p>Sorry, there was an error :( </p>
          <p>
            {error.status}, {error.msg}
          </p>
        </section>
      ) : (
        <ul>
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                setDeletedComment={setDeletedComment}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CommentList;

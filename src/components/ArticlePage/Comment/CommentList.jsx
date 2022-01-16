import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../utils/api";
import CommentCard from "./CommentCard";

const CommentList = ({ comments, setComments }) => {
  const { article_id } = useParams();

  const [error, setError] = useState({ status: null, msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [deletedComment, setDeletedComment] = useState(undefined);

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
        }
      })
      .catch((err) => {
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
      ) : error.status ? (
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

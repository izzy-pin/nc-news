import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../utils/api";
import CommentCard from "./CommentCard";

const CommentList = ({ comments, setComments }) => {
  const { article_id } = useParams();

  const [isError, setIsError] = useState(false);
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
        console.log(err.response.data.msg);
        console.log(err.response.status);
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
        <p>Sorry, theres been an error, we can't find this articles comments</p>
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

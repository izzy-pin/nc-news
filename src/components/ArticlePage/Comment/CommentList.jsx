import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../utils/api";
import CommentCard from "./CommentCard";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [article_id]);
  return (
    <section className="Comment__Section">
      {isLoading ? (
        <p>Loading comments</p>
      ) : isError ? (
        <p>Sorry, theres been an error, we can't find this articles comments</p>
      ) : (
        <ul>
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      )}
    </section>
  );
};

export default CommentList;

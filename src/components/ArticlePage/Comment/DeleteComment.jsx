import { useState } from "react";
import { deleteComment } from "../../../utils/api";

const DeleteComment = ({ comment_id, setDeletedComment }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsError(false);
    setIsLoading(true);
    deleteComment(comment_id)
      .then(() => {
        setIsLoading(false);
        setDeletedComment(comment_id);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err.message);
      });
  };

  return (
    <section>
      <button onClick={handleClick}>Delete Comment</button>
      <span>
        {isLoading
          ? " Deleting..."
          : isError
          ? " Error! Please try again"
          : null}
      </span>
    </section>
  );
};

export default DeleteComment;

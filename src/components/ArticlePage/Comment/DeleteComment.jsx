import { useState } from "react";
import { deleteComment } from "../../../utils/api";

const DeleteComment = ({ comment_id, setDeletedComment, setCommentCount }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsError(false);
    setIsLoading(true);
    setCommentCount((currCount) => +currCount - 1);
    deleteComment(comment_id)
      .then(() => {
        setIsLoading(false);
        setDeletedComment(comment_id);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
        setCommentCount((currCount) => +currCount + 1);
      });
  };

  return (
    <section>
      <button onClick={handleClick} className="Delete__button">
        <i className="far fa-trash-alt"></i> Delete
      </button>
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

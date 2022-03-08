import { useState } from "react";
import { deleteItem } from "../../utils/api";

const DeleteArticle = ({ article_id, setIsDeleted }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsError(false);
    setIsLoading(true);
    deleteItem("articles", article_id)
      .then(() => {
        setIsLoading(false);
        setIsDeleted(true);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };
  return (
    <div>
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
    </div>
  );
};

export default DeleteArticle;

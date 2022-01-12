import { useState } from "react";
import { patchArticleVote } from "../../utils/api";

const ArticleVotes = ({ article }) => {
  const [likedContent, setLikedContent] = useState(false);
  const [dislikedContent, setDislikedContent] = useState(false);
  const [count, setCount] = useState(article.votes);
  const [isError, setIsError] = useState(false);
  let inc;

  const like = () => {
    setIsError(false);
    setLikedContent((currLike) => !currLike);
    likedContent ? (inc = -1) : (inc = 1);
    setCount((currCount) => (likedContent ? currCount - 1 : currCount + 1));

    patchArticleVote(article.article_id, inc).catch(() => {
      setCount((currCount) => (likedContent ? currCount + 1 : currCount - 1));
      setLikedContent((currLike) => !currLike);
      setIsError(true);
    });
  };

  const dislike = () => {
    setIsError(false);
    setDislikedContent((currDislike) => !currDislike);
    dislikedContent ? (inc = 1) : (inc = -1);
    setCount((currCount) => (dislikedContent ? currCount + 1 : currCount - 1));

    patchArticleVote(article.article_id, inc).catch(() => {
      setCount((currCount) =>
        dislikedContent ? currCount - 1 : currCount + 1
      );
      setDislikedContent((currDislike) => !currDislike);
      setIsError(true);
    });
  };

  return (
    <div className="Votes__div">
      <button onClick={like} className="Like__button">
        <i
          className={!likedContent ? "far fa-thumbs-up" : "fas fa-thumbs-up"}
        ></i>
      </button>{" "}
      {count}{" "}
      <button onClick={dislike} className="Dislike__button">
        <i
          className={
            !dislikedContent ? "far fa-thumbs-down" : "fas fa-thumbs-down"
          }
        ></i>
      </button>
      {isError ? <p> sorry, there was an error, please try again</p> : null}
    </div>
  );
};

export default ArticleVotes;

import { useState } from "react";
import { patchVote } from "../../utils/api";

const Votes = ({ votes, id }) => {
  const [count, setCount] = useState(votes);
  const [isError, setIsError] = useState(false);
  if (typeof count === "undefined" && typeof votes !== "undefined") {
    setCount(votes);
  }

  const [votingChoice, setVotingChoice] = useState({
    like: false,
    dislike: false,
  });
  const componentPath = "comments";

  const vote = (inc, buttonType) => {
    setVotingChoice((currVoting) => {
      return { ...currVoting, [buttonType]: !currVoting[buttonType] };
    });
    setCount((currCount) =>
      votingChoice[buttonType] ? currCount - inc : currCount + inc
    );

    patchVote(id, inc, componentPath).catch(() => {
      setCount((currCount) =>
        votingChoice[buttonType] ? currCount + inc : currCount - inc
      );
      setVotingChoice((currVoting) => {
        return { ...currVoting, [buttonType]: !currVoting[buttonType] };
      });
      setIsError(true);
    });
  };

  return (
    <div className="Votes__div">
      <button
        onClick={() => {
          vote(1, "like");
        }}
        className="Like__button"
        disabled={votingChoice.dislike}
      >
        <i
          className={
            !votingChoice.like ? "far fa-thumbs-up" : "fas fa-thumbs-up"
          }
        ></i>
      </button>{" "}
      {count}{" "}
      <button
        onClick={() => {
          vote(-1, "dislike");
        }}
        className="Dislike__button"
        disabled={votingChoice.like}
      >
        <i
          className={
            !votingChoice.dislike ? "far fa-thumbs-down" : "fas fa-thumbs-down"
          }
        ></i>
      </button>
      {isError ? <p> sorry, there was an error, please try again</p> : null}
    </div>
  );
};

export default Votes;

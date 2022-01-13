import { useState } from "react";
import { postComment } from "../../../utils/api";
import { useImageUrl } from "../../../utils/useImageUrl";

const PostComment = ({ article_id, setComments }) => {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [data, setData] = useState({ username: "tickle122", body: "" });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const imageUrl = useImageUrl(data.username);

  const handleChange = (event) => {
    setTextAreaInput(event.target.value);
    setData((currData) => {
      currData.body = event.target.value;
      return { ...currData };
    });
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    setIsError(false);
    event.preventDefault();
    setTextAreaInput("");
    postComment(article_id, data)
      .then((commentFromApi) => {
        setIsLoading(false);
        setComments((currComments) => {
          return [commentFromApi, ...currComments];
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err.response.data.msg);
        console.log(err.response.status);
      });
  };

  return (
    <section className="PostComment_section">
      <img
        className="UserComment__img"
        src={imageUrl}
        alt="user's profile pic"
      ></img>
      <form className="PostComment__Form" onSubmit={handleSubmit}>
        <textarea
          required
          value={textAreaInput}
          onChange={handleChange}
          placeholder="Thoughts?..."
          className="PostComment__textarea"
        ></textarea>
        <button className="PostComment__button">Comment</button>

        <span>
          {" "}
          {isLoading
            ? "Posting your comment..."
            : isError
            ? "Sorry, there was an error, please try again"
            : null}
        </span>
      </form>
    </section>
  );
};

export default PostComment;

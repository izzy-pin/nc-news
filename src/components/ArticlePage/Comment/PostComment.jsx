import { useState } from "react";
import { postComment } from "../../../utils/api";
import { useImageUrl } from "../../../utils/useImageUrl";

const PostComment = ({ article_id, setComments }) => {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [data, setData] = useState({ username: "tickle122", body: "" });

  const imageUrl = useImageUrl(data.username);

  const handleChange = (event) => {
    setTextAreaInput(event.target.value);
    setData((currData) => {
      currData.body = event.target.value;
      return { ...currData };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTextAreaInput("");
    postComment(article_id, data)
      .then((commentFromApi) => {
        setComments((currComments) => {
          return [commentFromApi, ...currComments];
        });
      })
      .catch((err) => {
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
      <form onSubmit={handleSubmit}>
        <textarea
          required
          value={textAreaInput}
          onChange={handleChange}
          placeholder="Thoughts?..."
          className="PostComment__textarea"
        ></textarea>
        <button className="PostComment__buttom">Comment</button>
      </form>
    </section>
  );
};

export default PostComment;

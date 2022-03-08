import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultUserContext } from "../contexts/DefaultUser";
import { postArticle } from "../utils/api";

const PostArticle = () => {
  // on successfull submission, redirect to the article page or to the users profile to see it there?
  // need state for each of the 3 inputs
  const { user } = useContext(DefaultUserContext);
  const [inputs, setInputs] = useState({ topic: "coding" });
  const [isError, setIsError] = useState({ status: null, msg: "" });
  const [postedArticle, setPostedArticle] = useState({
    posted: false,
    article_id: null,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { ...inputs, author: user.username };
    setIsError({ status: null, msg: "" });
    postArticle(data)
      .then((postedArticleFromApi) => {
        setPostedArticle({
          posted: true,
          article_id: postedArticleFromApi.article_id,
        });
      })
      .catch((err) => {
        setIsError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });
  };
  return (
    <>
      {postedArticle.posted ? (
        <div>
          {" "}
          <h1>Success</h1>
          <p>
            Click to view your new article
            <Link to={`/articles/${postedArticle.article_id}`}>here</Link>
          </p>
        </div>
      ) : (
        <div>
          <h1> Post an article</h1>
          <form onSubmit={handleSubmit}>
            <p>Select your topic</p>
            <select
              aria-label="choose topic"
              name="topic"
              value={inputs.topic || "coding"}
              onChange={handleChange}
              required
            >
              <option value="coding">Coding</option>
              <option value="cooking">Cooking</option>
              <option value="football"> Football</option>
            </select>
            <p>Title</p>
            <input
              type="text"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
              required
            ></input>
            <p>Body text input - text area?</p>
            <textarea
              onChange={handleChange}
              name="body"
              value={inputs.body || ""}
              required
            ></textarea>
            <button>Post</button>
          </form>

          {isError.status === null ? null : (
            <p>
              Status : {isError.status}, error: {isError.msg}{" "}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default PostArticle;

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultUserContext } from "../contexts/DefaultUser";
import { postArticle } from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";

const PostArticle = () => {
  const { user } = useContext(DefaultUserContext);
  const [inputs, setInputs] = useState({ topic: "coding" });
  const [isError, setIsError] = useState({ status: null, msg: "" });
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    postArticle(data)
      .then((postedArticleFromApi) => {
        setPostedArticle({
          posted: true,
          article_id: postedArticleFromApi.article_id,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
        setIsLoading(false);
      });
  };
  return (
    <section className="postArticle__section">
      {isLoading ? (
        <>
          <p>*firing up the printing press...*</p>
          <LoadingSpinner />
        </>
      ) : postedArticle.posted ? (
        <div>
          {" "}
          <h1>Success!</h1>
          <p>
            View your new article{" "}
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
              required={true}
            >
              <option value="coding">Coding</option>
              <option value="cooking">Cooking</option>
              <option value="football"> Football</option>
            </select>
            <p>Title</p>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={inputs.title || ""}
              onChange={handleChange}
              required={true}
              maxLength="100"
            />
            <p>Article text - change to label?</p>
            <textarea
              onChange={handleChange}
              name="body"
              type="text"
              placeholder="Your article"
              value={inputs.body || ""}
              required={true}
              maxLength="4000"
            />
            <button>Post</button>
          </form>

          {isError.status === null ? null : (
            <p>
              Status : {isError.status}, error: {isError.msg}{" "}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default PostArticle;

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultUserContext } from "../contexts/DefaultUser";
import { postArticle } from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";

const PostArticle = () => {
  const { user } = useContext(DefaultUserContext);
  const [inputs, setInputs] = useState({
    topic: "coding",
    title: "",
    body: "",
  });
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
    <main className="postArticle__main">
      {isLoading ? (
        <>
          <p>*firing up the printing press...*</p>
          <LoadingSpinner />
        </>
      ) : postedArticle.posted ? (
        <div className="postArticle__div__success">
          {" "}
          <h1>Success!</h1>
          <p>
            View your new article{" "}
            <Link to={`/articles/${postedArticle.article_id}`}>here</Link>
          </p>
        </div>
      ) : (
        <>
          <h1> Post an article</h1>
          <form className="postArticle__form" onSubmit={handleSubmit}>
            <label>
              Choose a topic
              <select
                aria-label="choose topic"
                name="topic"
                value={inputs.topic || "coding"}
                onChange={handleChange}
                required={true}
                className="postArticle__select"
              >
                <option value="coding">Coding</option>
                <option value="cooking">Cooking</option>
                <option value="football"> Football</option>
              </select>
            </label>

            <label>
              Title
              <input
                type="text"
                name="title"
                placeholder="Your title"
                value={inputs.title || ""}
                onChange={handleChange}
                required={true}
                maxLength="100"
                className={
                  100 - inputs.title.length > 0
                    ? "postArticle__input"
                    : "postArticle__input noCharsleft"
                }
              />
            </label>
            <p className="inputChars__p">
              {100 - inputs.title.length}/100 characters remaining
            </p>
            <label>
              Article
              <textarea
                onChange={handleChange}
                name="body"
                type="text"
                placeholder="Tell us more..."
                value={inputs.body || ""}
                required={true}
                maxLength="4000"
                className={
                  4000 - inputs.body.length > 0
                    ? "postArticle__textarea"
                    : "postArticle__textarea noCharsleft"
                }
              />
            </label>
            <p className="inputChars__p">
              {4000 - inputs.body.length}/4000 characters remaining
            </p>
            <button className="postArticle__button">Post</button>
          </form>

          {isError.status === null ? null : (
            <p>
              Status : {isError.status}, error: {isError.msg}{" "}
            </p>
          )}
        </>
      )}
    </main>
  );
};

export default PostArticle;

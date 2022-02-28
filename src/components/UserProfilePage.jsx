import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserByUsername } from "../utils/api";
import { DefaultUserContext } from "../contexts/DefaultUser";
import { useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ArticlesList from "./ArticlesList";

const UserProfilePage = () => {
  const [authorArticlesTotal, setAuthorArticlesTotal] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState({
    status: null,
    msg: "",
  });

  const [didMount, setDidMount] = useState(false);

  const { author } = useParams();
  const { user } = useContext(DefaultUserContext);
  const loggedinUser = user.username;

  useEffect(() => {
    setDidMount(true);
    setIsLoading(true);
    setError(() => {
      return {
        status: null,
        msg: "",
      };
    });

    getUserByUsername(author)
      .then((userInfoFromApi) => {
        setUserInfo(userInfoFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({
          status: err.response.status,
          msg: err.response.data.msg,
        });
      });

    //runs when component is unmounted
    return () => setDidMount(false);
  }, [author]);

  if (!didMount) {
    return null;
  }

  return (
    <main>
      {isLoading ? (
        <section className="Loading__section">
          <p>*finding user...*</p>
          <LoadingSpinner />
        </section>
      ) : error.status ? (
        <section className="ErrorSection">
          <h2>Sorry there was an error :( </h2>
          <p>
            {error.status}, {error.msg}
          </p>
          <div className="Error__HomeLink">
            <Link to={"/"}>
              Home <i className="fas fa-home"></i>
            </Link>
          </div>
        </section>
      ) : (
        <section className="userPage__section">
          <div className="User__Div">
            {userInfo.avatar_url === undefined ? null : (
              <img
                className="User__img"
                src={userInfo.avatar_url}
                alt="user profile pic"
              ></img>
            )}
            <h1 className="Username__h1">{userInfo.username}</h1>
            <p className="UserFullName__p">{userInfo.name}</p>
          </div>
          {author === loggedinUser ? (
            <>
              {authorArticlesTotal ===
              undefined ? null : authorArticlesTotal === 0 ? (
                <h2>Looks like you haven't posted any articles!</h2>
              ) : (
                <h2 className="LoggedInUserArticles__h2">Articles by you</h2>
              )}
            </>
          ) : (
            <>
              {authorArticlesTotal ===
              undefined ? null : authorArticlesTotal === 0 ? (
                <h2>Looks like {author} hasn't posted any articles!</h2>
              ) : (
                <h2>Articles by {author}</h2>
              )}
            </>
          )}
          <ArticlesList
            author={author}
            setAuthorArticlesTotal={setAuthorArticlesTotal}
          />
        </section>
      )}
    </main>
  );
};

export default UserProfilePage;

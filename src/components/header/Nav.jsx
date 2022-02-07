import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getTopics } from "../../utils/api";
import UserImage from "../ArticlePage/Comment/UserImage";
import { capitaliseStr } from "../../utils/api";

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <nav className="Nav">
      <NavLink
        className={({ isActive }) =>
          isActive ? "NavLink NavLink--Active" : "NavLink"
        }
        to="/"
      >
        {" "}
        news rn
      </NavLink>

      <div className="Nav--TopicsDiv">
        {isLoading ? (
          <span>preparing topics...</span>
        ) : isError ? (
          <span>sorry, an error has occured</span>
        ) : (
          topics.map((topic) => (
            <NavLink
              key={topic.slug}
              className={({ isActive }) =>
                isActive
                  ? "NavLink NavLink--Topics NavLink--Active"
                  : "NavLink--Topics NavLink"
              }
              to={`/topics/${topic.slug}`}
            >
              {capitaliseStr(topic.slug)}
            </NavLink>
          ))
        )}
        <UserImage username={"tickle122"} />
      </div>
    </nav>
  );
};

export default Nav;

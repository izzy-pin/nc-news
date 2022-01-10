import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getTopics } from "../utils/api";

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
      .catch((err) => {
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
          topics.map((topic) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "NavLink NavLink--Topics NavLink--Active"
                    : "NavLink--Topics NavLink"
                }
                to={`/topics/${topic.slug}`}
                key={topic.slug}
              >
                {topic.slug}
              </NavLink>
            );
          })
        )}
      </div>
    </nav>
  );
};

export default Nav;

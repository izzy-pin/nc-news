import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getTopics } from "../../utils/api";
import NavBarLink from "./NavBarLink";

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
          topics.map((topic) => <NavBarLink key={topic.slug} topic={topic} />)
        )}
      </div>
    </nav>
  );
};

export default Nav;

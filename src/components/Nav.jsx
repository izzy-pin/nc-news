import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getTopics } from "../utils/api";

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
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
        {topics.map((topic) => {
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
        })}
      </div>
    </nav>
  );
};

export default Nav;

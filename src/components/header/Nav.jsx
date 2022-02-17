import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getTopics } from "../../utils/api";
import { capitaliseStr } from "../../utils/api";
import { DefaultUserContext } from "../../contexts/DefaultUser";
import { useContext } from "react";
import Popover from "@mui/material/Popover";

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(DefaultUserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          isActive ? "NavLink NavLink__Active" : "NavLink"
        }
        to="/"
      >
        {" "}
        news rn
      </NavLink>

      <div className="Nav__TopicsDiv">
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
                  ? "NavLink NavLink__Topics NavLink__Active"
                  : "NavLink__Topics NavLink"
              }
              to={`/topics/${topic.slug}`}
            >
              {capitaliseStr(topic.slug)}
            </NavLink>
          ))
        )}

        <i
          className="fas fa-user pp__Nav"
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        ></i>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div className="popover__Div">
            <img
              className="UserComment__img"
              src={user.avatar_url}
              alt="user profile pic"
            ></img>
            <div className="popoverinfo__Div">
              <p className="popoverUsername__p">{user.username}</p>
              <p>{user.name}</p>
            </div>
          </div>
        </Popover>
      </div>
    </nav>
  );
};

export default Nav;

import { NavLink } from "react-router-dom";
const NavBarLink = ({ topic }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "NavLink NavLink--Topics NavLink--Active"
          : "NavLink--Topics NavLink"
      }
      to={`/topics/${topic.slug}`}
    >
      {topic.slug}
    </NavLink>
  );
};

export default NavBarLink;

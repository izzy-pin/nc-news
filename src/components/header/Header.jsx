import { useContext } from "react";
import { Link } from "react-router-dom";
import { DefaultUserContext } from "../../contexts/DefaultUser";

import Nav from "./Nav";

const Header = () => {
  const currentDate = new Date();
  const { user } = useContext(DefaultUserContext);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <header>
      <Nav />
      <section className="DatePost__Section">
        <p className="Date__p">
          {currentDate.toLocaleDateString("en-uk", options)}
        </p>
        {user.username === "tickle122" ? (
          <Link className="postArticle__link" to="post-article">
            <i className="fas fa-edit"></i>
          </Link>
        ) : null}
      </section>
    </header>
  );
};

export default Header;

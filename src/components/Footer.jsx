const Footer = () => {
  return (
    <footer>
      {" "}
      news rn back-end on{" "}
      <a
        href="https://github.com/izzy-pin/news-rn"
        target="_blank"
        rel="noreferrer"
      >
        GitHub <i className="fab fa-github"></i>
      </a>{" "}
      and hosted on{" "}
      <a
        href="https://newsrn.herokuapp.com/api/"
        target="_blank"
        rel="noreferrer"
      >
        {" "}
        Heroku <i className="fas fa-server"></i>
      </a>
    </footer>
  );
};

export default Footer;

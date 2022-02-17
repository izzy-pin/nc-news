const Footer = () => {
  return (
    <footer>
      <section>
        <p>
          By
          <a
            href="https://github.com/izzy-pin"
            target="_blank"
            rel="noreferrer"
          >
            Izzy Pinder
          </a>
        </p>
        <p>
          Find this project on
          <a
            href="https://github.com/izzy-pin/news-rn"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <i className="fab fa-github"></i>
          </a>
        </p>
      </section>
      <p>
        View the news rn back-end on
        <a
          href="https://github.com/izzy-pin/news-rn-back-end"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <i className="fab fa-github"></i>
        </a>
        and
        <a
          href="https://newsrn.herokuapp.com/api/"
          target="_blank"
          rel="noreferrer"
        >
          Heroku <i className="fas fa-server"></i>
        </a>
      </p>
    </footer>
  );
};

export default Footer;

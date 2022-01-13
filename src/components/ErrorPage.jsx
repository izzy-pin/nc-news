import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="ErrorPage">
      <section className="ErrorSection">
        <p>Sorry, nothing here!</p>
        <div className="Error__HomeLink">
          <Link to={"/"}>
            Home <i className="fas fa-home"></i>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;

import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const createdDate = new Date(article.created_at);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = createdDate.toLocaleDateString("en-uk", options);

  return (
    <li className="ArticleCard">
      <Link
        to={`/articles/${article.article_id}`}
        className="ArticleCard__Link"
      >
        <h3>{article.topic}</h3>
        <div className="ArticleCard__div__author">
          <h2 className="ArticleCard__h2">{article.title}</h2>
          <h4 className="ArticleCard__h4">{article.author}</h4>
        </div>
        <div className="ArticleCard-Div">
          <span>{formattedDate} </span>
          <span>
            Comments: {article.comment_count}{" "}
            <i className="far fa-thumbs-up"></i> {article.votes}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ArticleCard;

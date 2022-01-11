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
    <li key={article.article_id} className="ArticleCard">
      <Link
        to={`/articles/${article.article_id}`}
        className="ArticleCard__Link"
      >
        <h3>{article.topic}</h3>
        <h2>{article.title}</h2>
        <h4>{article.author}</h4>
        <div className="ArticleCard-Div">
          <span>{formattedDate} </span>
          <span>
            Comments: {article.comment_count} <i className="far fa-star"></i>:{" "}
            {article.votes}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ArticleCard;

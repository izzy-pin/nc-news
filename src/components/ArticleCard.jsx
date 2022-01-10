const ArticleCard = ({ article }) => {
  const date = article.created_at.split("T");
  const formattedDate = date[0].split("-").reverse().join("-");
  return (
    <li key={article.article_id} className="ArticleCard">
      <h3>{article.topic}</h3>
      <h2>{article.title}</h2>
      <h4>{article.author}</h4>
      <div className="ArticleCard-Div">
        <span>{formattedDate} </span>
        <span>
          Comments: {article.comment_count} ⭐: {article.votes}
        </span>
      </div>
    </li>
  );
};

export default ArticleCard;

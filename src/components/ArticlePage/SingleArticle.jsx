const SingleArticle = ({ article }) => {
  const createdDate = new Date(article.created_at);

  return (
    <main className="SingleArticle__main">
      <article className="SingleArticle__article">
        <p className="SingleArticle__topic">{article.topic}</p>
        <h2 className="SingleArticle__title">{article.title}</h2>
        <p className="SingleArticle__author">{article.author}</p>{" "}
        <p className="SingleArticle__date">{createdDate.toUTCString()}</p>
        <p className="SingleArticle__body">{article.body}</p>
        <div className="CommentVote__Div">
          <span>Comments: {article.comment_count}</span>{" "}
          <span>
            {" "}
            <i className="far fa-star"></i>: {article.votes}
          </span>
        </div>
      </article>
    </main>
  );
};

export default SingleArticle;

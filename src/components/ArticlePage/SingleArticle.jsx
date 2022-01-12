import CommentList from "./Comment/CommentList";
import ArticleVotes from "./ArticleVotes";

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
          <ArticleVotes article={article} />
        </div>
      </article>
      {
        //post comments
      }
      <CommentList />
    </main>
  );
};

export default SingleArticle;

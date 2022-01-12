import CommentList from "./Comment/CommentList";
import ArticleVotes from "./ArticleVotes";
import PostComment from "./Comment/PostComment";
import { useState } from "react";

const SingleArticle = ({ article }) => {
  const createdDate = new Date(article.created_at);
  const [comments, setComments] = useState([]);

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

      <PostComment article_id={article.article_id} setComments={setComments} />
      <CommentList comments={comments} setComments={setComments} />
    </main>
  );
};

export default SingleArticle;

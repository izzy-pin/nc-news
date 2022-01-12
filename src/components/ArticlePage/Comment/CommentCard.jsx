import CommentVotes from "./CommentVotes";
import UserImage from "./UserImage";

const CommentCard = ({ comment }) => {
  const createdDate = new Date(comment.created_at);
  return (
    <li className="CommentCard__li">
      <section className="CommentCard__body">
        <div className="CommentCard__userDiv">
          <UserImage username={comment.author} />
          <div className="CommentCard__infoDiv">
            <p>{comment.author}</p>
            <p>{createdDate.toUTCString()}</p>
          </div>
        </div>
        <p>{comment.body}</p>
        <CommentVotes comment={comment} />
      </section>
    </li>
  );
};

export default CommentCard;

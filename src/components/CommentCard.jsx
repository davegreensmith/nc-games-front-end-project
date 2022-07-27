import { formatDate } from '../utils/functions';

export default function CommentCard({ comment: { author, body, comment_id, created_at, review_id, votes } }) {
  return (
    <article className="comment-card">
      <h3 id="author">{author}</h3>
      <p id="body">{body}</p>
      <p id="date">Date: {formatDate(created_at)}</p>
      <p id="votes">Votes: {votes}</p>
    </article>
  );
}

{
}

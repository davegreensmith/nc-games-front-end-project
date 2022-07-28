import { Link, useParams } from 'react-router-dom';

export default function CommentPostSuccess() {
  const { review_id } = useParams();

  return (
    <section>
      <h1>🎉</h1>
      <h3>Your comment has been posted</h3>
      <Link className="review-card-link" to={`/review/${review_id}`}>
        Back to Review
      </Link>
    </section>
  );
}

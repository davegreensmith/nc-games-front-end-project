import { Link } from 'react-router-dom';
import * as api from '../utils/api';

export default function ReviewCard({ review }) {
  const { category, comment_count, created_at, designer, owner, review_body, review_img_url, title, votes, review_id } = review;

  return (
    <article className="review-card">
      <img src={review_img_url}></img>
      <div id="review-card-preview">
        <h4>{title}</h4>
        <p>Category: {category}</p>
        <p>Designer: {designer}</p>
      </div>
      <div className="review-card-buttons">
        <Link className="review-card-link" to={`/review/${review_id}`}>
          View
        </Link>
        <Link className="review-card-link" to={`/review/reviews/${review_id}/comments`}>
          Comments ({comment_count})
        </Link>
        <p>Votes: {votes}</p>
      </div>
    </article>
  );
}

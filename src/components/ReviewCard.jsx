import { Link } from 'react-router-dom';
import { formatDate } from '../utils/functions';

export default function ReviewCard({ review }) {
  if (!review) {
    return <p>Loading...</p>;
  } else {
    const { category, comment_count, created_at, designer, review_img_url, title, votes, review_id } = review;

    return (
      <article className="review-card">
        <img src={review_img_url} alt="game"></img>
        <div id="review-card-preview">
          <h4>{title}</h4>
          <p>Date of Review: {formatDate(created_at)}</p>
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
}

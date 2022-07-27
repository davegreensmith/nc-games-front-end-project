import { Link } from 'react-router-dom';

export default function ReviewOptions({ currentReview, handleAddVote, review_id }) {
  return (
    <div className="navigation-review-full">
      <div className="voting">
        <p>Number of votes: {currentReview.votes}</p>
        <button
          className="vote-button"
          onClick={() => {
            handleAddVote(1);
          }}
        >
          👍
        </button>
        <button
          className="vote-button"
          onClick={() => {
            handleAddVote(-1);
          }}
        >
          👎
        </button>
      </div>
      <Link className="category-link" to={`/review/reviews/${review_id}/comments`}>
        Comments ({currentReview.comment_count})
      </Link>
    </div>
  );
}

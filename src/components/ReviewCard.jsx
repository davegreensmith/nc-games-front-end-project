export default function ReviewCard({ review }) {
  const { category, comment_count, created_at, designer, owner, review_body, review_img_url, title, votes } = review;

  return (
    <article className="review-card">
      <img src={review_img_url}></img>
      <div id="review-card-preview">
        <h4>{title}</h4>
        <p>Designed by: {designer}</p>
      </div>
      <div id="review-card-buttons">
        <button>Review</button>
        <button>Comments</button>
        <p>Votes: {votes}</p>
      </div>
    </article>
  );
}

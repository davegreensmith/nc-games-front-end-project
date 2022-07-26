import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as api from '../utils/api';

export default function ReviewFull() {
  const { review_id } = useParams();

  const [currentReview, setCurrentReview] = useState(null);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    api.fetchReviewById(review_id).then((review) => {
      setCurrentReview(review);
      setIsLoadingReview(false);
    });
  }, []);

  return (
    <section>
      {isLoadingReview ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="navigation-review-full">
            <p>Number of votes: {currentReview.votes}</p>
            <button>Add Vote</button>
            <Link className="navigation-sub-buttons" to={`/review/reviews/${review_id}/comments`}>
              Comments ({currentReview.comment_count})
            </Link>
          </div>
          <div className="full-review">
            <h2>{currentReview.title}</h2>
            <img src={currentReview.review_img_url} alt="game example" srcset="" />
            <p>Review: {currentReview.review_body}</p>
            <p>Category: {currentReview.category}</p>
            <p>Designer: {currentReview.designer}</p>
            <p>Owner: {currentReview.owner}</p>
          </div>
        </>
      )}
    </section>
  );
}

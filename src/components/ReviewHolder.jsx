import { useState, useEffect } from 'react';
import * as api from '../utils/api';

import ReviewCard from './ReviewCard';

export default function ReviewHolder() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.fetchReviews().then((reviewsArr) => {
      setReviews(reviewsArr);
    });
  }, []);

  return (
    <ul>
      {reviews.map((review) => {
        return <ReviewCard key={review.review_id} review={review} />;
      })}
    </ul>
  );
}

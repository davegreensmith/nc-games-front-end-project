import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as api from '../utils/api';

import ReviewCard from './ReviewCard';

export default function ReviewHolder({ selectedCategory }) {
  const [reviews, setReviews] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    if (search) {
      api.fetchReviewsByCategory(search).then((response) => {
        setReviews(response);
      });
    } else {
      api.fetchReviews().then((reviewsArr) => {
        setReviews(reviewsArr);
      });
    }
  }, [search]);

  return (
    <ul>
      {reviews.map((review) => {
        return <ReviewCard key={review.review_id} review={review} />;
      })}
    </ul>
  );
}

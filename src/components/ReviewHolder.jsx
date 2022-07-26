import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import * as api from '../utils/api';
import { ErrorContext } from '../utils/contexts';

import ReviewCard from './ReviewCard';
import ReviewFull from './ReviewFull';
import Errors from './Errors';

export default function ReviewHolder({ setCurrentReview }) {
  const [reviews, setReviews] = useState([]);
  const { search } = useLocation();
  const { error, setError } = useContext(ErrorContext);

  useEffect(() => {
    setError(null);
    if (search) {
      api
        .fetchReviewsByCategory(search)
        .then((response) => {
          setReviews(response);
        })
        .catch(({ response: { status, statusText } }) => {
          setError({ statusCode: status, msg: statusText });
        });
    } else {
      api.fetchReviews().then((reviewsArr) => {
        setReviews(reviewsArr);
      });
    }
  }, [search]);

  if (error) {
    return <Errors error={error} />;
  } else {
    return (
      <ul>
        {reviews.map((review) => {
          return <ReviewCard key={review.review_id} review={review} />;
        })}
      </ul>
    );
  }
}

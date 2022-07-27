import { useEffect, useState, useContext } from 'react';
import { ErrorContext } from '../utils/contexts';

import * as api from '../utils/api';

const useGetReview = (review_id) => {
  const { error, setError } = useContext(ErrorContext);
  const [currentReview, setCurrentReview] = useState(null);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    setError(null);
    api
      .fetchReviewById(review_id)
      .then((review) => {
        setCurrentReview(review);
        setIsLoadingReview(false);
      })
      .catch(({ response: { status, statusText } }) => {
        setError({ statusCode: status, msg: statusText });
      });
  }, []);

  return { currentReview, setCurrentReview, isLoadingReview, error };
};

export default useGetReview;

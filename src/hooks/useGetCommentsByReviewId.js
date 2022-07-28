import { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../utils/contexts';

import * as api from '../utils/api';

const useGetCommentsByReviewId = (review_id) => {
  const { error, setError } = useContext(ErrorContext);
  const [allComments, setAllComments] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    setError(null);
    api
      .fetchCommentsByReviewId(review_id)
      .then((response) => {
        setAllComments(response, '<<<comments');
        setIsLoadingComments(false);
      })
      .catch(({ response: { status, statusText } }) => {
        setError({ statusCode: status, msg: statusText });
      });
  }, [review_id]);

  return { allComments, setAllComments, isLoadingComments, setIsLoadingComments, error, setError };
};

export default useGetCommentsByReviewId;

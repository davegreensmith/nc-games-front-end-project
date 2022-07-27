import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContext } from '../utils/contexts';

import * as api from '../utils/api';
import Errors from './Errors';

import useGetReview from '../hooks/useGetReview';
import CommentCard from './CommentCard';
import ReviewCard from './ReviewCard';

export default function CommentHolder() {
  const { review_id } = useParams();
  const { error, setError } = useContext(ErrorContext);

  const [allComments, setAllComments] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const { currentReview } = useGetReview(review_id);

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
  }, []);

  if (error) {
    return <Errors error={error} />;
  } else {
    return (
      <section>
        {isLoadingComments ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3>Review:</h3>
            <ReviewCard review={currentReview} />
            <h4>Comments: ({allComments.length})</h4>
            <ul>
              {allComments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} />;
              })}
            </ul>
          </>
        )}
      </section>
    );
  }
}

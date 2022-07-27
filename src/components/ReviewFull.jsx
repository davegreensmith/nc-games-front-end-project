import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ErrorContext } from '../utils/contexts';

import * as api from '../utils/api';
import Errors from './Errors';
import ReviewOptions from './ReviewOptions';

export default function ReviewFull() {
  const { review_id } = useParams();
  const { error, setError } = useContext(ErrorContext);

  const [currentReview, setCurrentReview] = useState(null);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const handleAddVote = (voteIncrement) => {
    setError(null);
    const newReviewVotes = { ...currentReview };
    newReviewVotes.votes += voteIncrement;
    setCurrentReview(newReviewVotes);

    api
      .updateVotesByReviewId(review_id, voteIncrement)
      .then((response) => {})
      .catch(({ response: { status, statusText } }) => {
        setError({ statusCode: status, msg: statusText });
      });
  };

  const formatDate = (created_at) => {
    const d = new Date(created_at);
    return d.toLocaleDateString('en-GB');
  };

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

  if (error) {
    return <Errors error={error} />;
  } else {
    return (
      <section>
        {isLoadingReview ? (
          <p>Loading...</p>
        ) : (
          <>
            <ReviewOptions currentReview={currentReview} handleAddVote={handleAddVote} review_id={review_id} />

            <div className="full-review">
              <h2>{currentReview.title}</h2>
              <img src={currentReview.review_img_url} alt="game example" />
              <p>{currentReview.review_body}</p>
              <p>Category: {currentReview.category}</p>
              <p>Designer: {currentReview.designer}</p>
              <p>Owner: {currentReview.owner}</p>
              <p>Date of Review: {formatDate(currentReview.created_at)}</p>
            </div>
          </>
        )}
      </section>
    );
  }
}

import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContext } from '../utils/contexts';

import * as api from '../utils/api';
import Errors from './Errors';

import useGetReview from '../hooks/useGetReview';
import CommentCard from './CommentCard';
import ReviewCard from './ReviewCard';
import CommentPost from './CommentPost';

export default function CommentHolder() {
  const { review_id } = useParams();
  const { error, setError } = useContext(ErrorContext);

  const [allComments, setAllComments] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const { currentReview } = useGetReview(review_id);

  const commentForm = useRef(null);

  const executeScroll = () => commentForm.current.scrollIntoView();

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
            <section className="comment-sub-header">
              <h4>Comments: ({allComments.length})</h4>
              <button onClick={executeScroll}>Go to comment form</button>
            </section>
            <ul>
              {allComments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} />;
              })}
            </ul>
            <section ref={commentForm} className="comment-form">
              <CommentPost />
            </section>
          </>
        )}
      </section>
    );
  }
}

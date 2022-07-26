import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import Errors from './Errors';

import useGetReview from '../hooks/useGetReview';
import CommentCard from './CommentCard';
import ReviewCard from './ReviewCard';
import CommentPost from './CommentPost';
import useGetCommentsByReviewId from '../hooks/useGetCommentsByReviewId';
import BackToTopButton from './BackToTopButton';

export default function CommentHolder() {
  const { review_id } = useParams();

  const { allComments, setAllComments, isLoadingComments, error, setError } = useGetCommentsByReviewId(review_id);

  const { currentReview } = useGetReview(review_id);

  const commentForm = useRef(null);
  const executeScroll = () => commentForm.current.scrollIntoView();

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
            <div className="comment-holder-review-card">
              <ReviewCard review={currentReview} />
              <section className="comment-sub-header">
                <h4>Comments: ({allComments.length})</h4>
                <button onClick={executeScroll}>Go to comment form</button>
              </section>
            </div>
            <ul>
              {allComments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} setError={setError} />;
              })}
            </ul>
            <section ref={commentForm} className="comment-form">
              <CommentPost allComments={allComments} setAllComments={setAllComments} />
              {/* <BackToTopButton /> */}
            </section>
          </>
        )}
      </section>
    );
  }
}

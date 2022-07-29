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

  const { allComments, setAllComments, isLoadingComments, error } = useGetCommentsByReviewId(review_id);

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
              <CommentPost allComments={allComments} setAllComments={setAllComments} />
              {/* <BackToTopButton /> */}
            </section>
          </>
        )}
      </section>
    );
  }
}

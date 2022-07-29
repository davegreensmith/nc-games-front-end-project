import { useContext, useState } from 'react';
import { CurrentUserContext } from '../utils/contexts';
import { formatDate } from '../utils/functions';
import * as api from '../utils/api';
import useGetCommentsByReviewId from '../hooks/useGetCommentsByReviewId';

export default function CommentCard({ comment: { author, body, comment_id, created_at, review_id, votes }, setError }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [deleteSentStatus, setDeleteSentStatus] = useState('Delete');

  const handleDelete = (comment_id) => {
    setDeleteSentStatus('Deleting comment');
    api
      .deleteComment(comment_id)
      .then(({ status }) => {
        if (status === 204) setDeleteSentStatus('Comment Deleted');
      })
      .catch(({ response: { status, statusText } }) => {
        setError({ statusCode: status, msg: statusText });
      });
  };
  return (
    <article className={`comment-card ${deleteSentStatus}`}>
      <h3 id="author">{author}</h3>
      <p id="body">{body}</p>
      <p id="date">Date: {formatDate(created_at)}</p>
      <p id="votes">Votes: {votes}</p>
      <>
        {currentUser.username === author ? (
          <button
            disabled={isButtonDisabled}
            onClick={() => {
              handleDelete(comment_id);
              setIsButtonDisabled(true);
            }}
          >
            {deleteSentStatus}
          </button>
        ) : (
          <></>
        )}
        {deleteSentStatus === 'Comment Deleted' ? <p className="delete-success">Comment has successfully deleted</p> : <></>}
      </>
    </article>
  );
  // }
}

import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { CurrentUserContext } from '../utils/contexts';
import * as api from '../utils/api';
import Errors from './Errors';

import useGetCommentsByReviewId from '../hooks/useGetCommentsByReviewId';
import CommentForm from './CommentForm';
import CommentPostSuccess from './CommentPostSuccess';
import CommentPostPending from './CommentPostPending';

export default function CommentPost() {
  const [newComment, setNewComment] = useState('up to 888 characters');
  const [isCommentValid, setIsCommentValid] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ idle: true, sending: false, success: false });
  const { currentUser } = useContext(CurrentUserContext);
  const { username } = currentUser;
  const { review_id } = useParams();

  const { setIsLoadingComments, error, setError } = useGetCommentsByReviewId(review_id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    setSubmitStatus({ idle: false, sending: true, success: false });

    const body = {
      username,
      body: newComment,
    };

    api
      .postReview(review_id, body)
      .then((response) => {
        if (response.status === 201) {
          setSubmitStatus({ idle: false, sending: false, success: true });
        }
      })
      .catch(({ response: { status, statusText } }) => {
        setError({ statusCode: status, msg: statusText });
      });
  };

  useEffect(() => {
    newComment === '' || newComment === 'up to 888 characters' ? setIsCommentValid(false) : setIsCommentValid(true);
  }, [newComment]);

  if (error) {
    return <Errors error={error} />;
  } else {
    if (submitStatus.success === true) {
      return <CommentPostSuccess />;
    } else if (submitStatus.sending === true) {
      return <CommentPostPending />;
    } else {
      return (
        <section>
          <CommentForm handleCommentSubmit={handleCommentSubmit} newComment={newComment} setNewComment={setNewComment} isCommentValid={isCommentValid} />
        </section>
      );
    }
  }
}

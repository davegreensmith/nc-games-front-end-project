import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContext } from '../utils/contexts';

import * as api from '../utils/api';
import Errors from './Errors';

export default function CommentHolder() {
  const { review_id } = useParams();
  const { error, setError } = useContext(ErrorContext);

  const [allComments, setAllComments] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    setError(null);
    api
      .fetchCommentsByReviewId(review_id)
      .then((response) => {
        setAllComments(response);
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
            <h2>Comment Holder</h2>
          </>
        )}
      </section>
    );
  }
}

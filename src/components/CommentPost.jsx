import { useEffect, useState } from 'react';

export default function CommentPost() {
  const [newComment, setNewComment] = useState('up to 888 characters');
  const [isCommentValid, setIsCommentValid] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    console.log(newComment, '<<< submitted comment');
  };

  useEffect(() => {
    newComment === '' || newComment === 'up to 888 characters' ? setIsCommentValid(false) : setIsCommentValid(true);
  }, [newComment]);

  let addToClass = '';
  isCommentValid ? (addToClass = 'goodComment') : (addToClass = 'badComment');

  return (
    <form onSubmit={handleCommentSubmit}>
      <fieldset>
        {/* <label for="comment">Leave your comment: </label> */}
        <textarea
          className={`${addToClass}`}
          type="text"
          name="comment"
          maxLength="888"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            console.log(newComment);
          }}
        ></textarea>
        {isCommentValid ? (
          <>
            <p id="char-count">Comment count = {newComment.length} chars</p>
            <div className="comment-form-buttons">
              <button>Submit</button>
              <button
                type="button"
                onClick={() => {
                  setNewComment('up to 888 characters');
                }}
              >
                Clear
              </button>
            </div>
          </>
        ) : (
          <p id="add-comment">Please add your comment above</p>
        )}
        <legend>Add your own comment</legend>
      </fieldset>
    </form>
  );
}

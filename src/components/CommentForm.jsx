export default function CommentForm({ handleCommentSubmit, newComment, setNewComment, isCommentValid }) {
  let addToClass = '';
  isCommentValid ? (addToClass = 'goodComment') : (addToClass = 'badComment');

  return (
    <form onSubmit={handleCommentSubmit}>
      <fieldset>
        <textarea
          className={`comment-textarea ${addToClass}`}
          type="text"
          name="comment"
          maxLength="888"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
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

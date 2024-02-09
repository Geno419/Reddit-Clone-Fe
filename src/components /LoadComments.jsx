import React from "react";

function LoadComments({ comments, createDeleteButton, formatDate }) {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment" key={comment.comment_id}>
          <h5>{comment.author}</h5>
          <p>{comment.body}</p>
          <p>{`votes: ${comment.votes}`}</p>
          <p className="date">{formatDate(comment.created_at)}</p>
          {createDeleteButton(comment)}
        </div>
      ))}
    </div>
  );
}

export default LoadComments;

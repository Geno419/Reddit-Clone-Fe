import React from "react";

function AddComments({ addComment, user }) {
  return (
    <form onSubmit={addComment} className="addComment">
      <figure className="comment_profile_pic">
        <img src={user.avatar_url} alt={`${user.name} profile picture`} />
      </figure>
      <label htmlFor="newComment"></label>
      <input type="text" placeholder="Add a comment" />
      <button>Submit</button>
    </form>
  );
}

export default AddComments;

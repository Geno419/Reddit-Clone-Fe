import { patchVoteByID, postComment, removeCommentFromDB } from "./api";

export function upVote(
  article_id,
  vote,
  upVoted,
  downVoted,
  setVote,
  setUpVoted,
  setDownVoted
) {
  if (downVoted === true) {
    setVote(vote + 2);
    patchVoteByID(article_id, { IncrementBy: "2" });
    setDownVoted(false);
    setUpVoted(true);
  } else if (upVoted === false) {
    setVote(vote + 1);
    patchVoteByID(article_id, { IncrementBy: "1" });
    setUpVoted(true);
  } else if (upVoted === true) {
    setVote(vote - 1);
    patchVoteByID(article_id, { IncrementBy: "-1" });
    setUpVoted(false);
  }
}

export function downVote(
  article_id,
  vote,
  upVoted,
  downVoted,
  setVote,
  setUpVoted,
  setDownVoted
) {
  if (upVoted === true) {
    setVote(vote - 2);
    patchVoteByID(article_id, { IncrementBy: "-2" });
    setUpVoted(false);
    setDownVoted(true);
  } else if (downVoted === false) {
    setVote(vote - 1);
    patchVoteByID(article_id, { IncrementBy: "-1" });
    setDownVoted(true);
  } else if (downVoted === true) {
    setVote(vote + 1);
    patchVoteByID(article_id, { IncrementBy: "1" });
    setDownVoted(false);
  }
}

export function addComment(
  event,
  article_id,
  user,
  comments,
  setComments,
  commentMessageToUser
) {
  commentMessageToUser.style.color = "white";
  commentMessageToUser.innerText = "Posting...";

  const body = event.target[0].value;
  if (body.length <= 3) {
    event.preventDefault();
    commentMessageToUser.innerText =
      "Comments need to be more than 3 characters";
    commentMessageToUser.style.color = "red";
  } else {
    event.preventDefault();
    const newComment = {
      username: user.username,
      body: body,
    };
    event.target[0].value = "";
    postComment(article_id, newComment)
      .then((res) => {
        setComments([res.data.comment[0], ...comments]);
      })
      .then(() => {
        commentMessageToUser.innerText = "Comment has been posted";
        commentMessageToUser.style.color = "green";
      });
  }
}

export function deleteComment(
  currentComment,
  comments,
  setComments,
  commentMessageToUser
) {
  commentMessageToUser.style.color = "white";
  commentMessageToUser.innerText = "Deleting...";

  removeCommentFromDB(currentComment.comment_id).then(() => {
    setComments(
      comments.filter(
        (comment) => comment.comment_id !== currentComment.comment_id
      )
    );
    commentMessageToUser.innerText = "Comment has been deleted";
    commentMessageToUser.style.color = "green";
  });
}

export function createDeleteButton(user, comment, deleteComment) {
  if (user.username === comment.author) {
    return (
      <button
        onClick={() => {
          deleteComment(comment);
        }}
        className="deleteButton"
      >
        delete
      </button>
    );
  }
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCommentsByArticleId,
  fetchArticleByArticleId,
  patchVoteByID,
  postComment,
  removeCommentFromDB,
} from "../utils/api";
import { formatDate } from "../utils/functions";

export default function SingleArticle(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [singleArticle, setSingleArticle] = useState([]);
  const [vote, setVote] = useState();
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const { article_id } = useParams();
  const { user } = props;
  const commentMessageToUser = document.getElementById("message_to_user");
  useEffect(() => {
    fetchArticleByArticleId(article_id)
      .then(({ result }) => {
        setSingleArticle(result[0]);
        setVote(result[0].votes);
        setLoading(false);
      })
      .catch(() => {
        navigate(`/NotFound`);
      });
  }, []);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((res) => {
      setComments(res);
    });
  }, []);

  function upVote() {
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

  function downVote() {
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

  function addComment(event) {
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
  function deleteComment(currentComment) {
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
  function createDeleteButton(comment) {
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
      S;
    }
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <article className="single_article">
          <div>
            <div className="title">
              <h3>{singleArticle.title}</h3>
            </div>
            <p>{singleArticle.body}</p>
            <figure>
              <img
                src={singleArticle.article_img_url}
                alt={`Image for ${singleArticle.authors} post`}
              />
            </figure>
            <div className="article_author">
              <p>{`Post created by: ${singleArticle.author}`}</p>
            </div>
            <div className=" single_article_details">
              <p>{`Votes: ${vote} `}</p>
              <button onClick={upVote}>up vote</button>
              <button onClick={downVote}>down vote</button>
              <p>{`comments: ${comments.length} `}</p>
            </div>
            <p className="date">{formatDate(singleArticle.created_at)}</p>
          </div>
          <form onSubmit={addComment} className="addComment">
            <figure className="comment_profile_pic">
              <img src={user.avatar_url} alt={`${user.name} profile picture`} />
            </figure>
            <label htmlFor="newComment"></label>
            <input type="text" placeholder="Add a comment" />
            <button>Submit</button>
          </form>
          <div id="message_to_user" alert="alert"></div>

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
        </article>
      )}
    </>
  );
}

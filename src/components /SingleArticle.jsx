import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCommentsByArticleId,
  formatDate,
  fetchArticleByArticleId,
  patchVoteByID,
} from "../utils/api";

export default function SingleArticle(props) {
  const [comments, setComments] = useState([]);
  const [singleArticle, setSingleArticle] = useState([]);
  const [vote, setVote] = useState();
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticleByArticleId(article_id).then(({ result }) => {
      setSingleArticle(result[0]);
      setVote(result[0].votes);
    });
  }, []);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((res) => {
      setComments(res);
    });
  }, []);

  // patchVoteByID;
  function upVote() {
    patchVoteByID(article_id, { IncrementBy: "1" }).then((result) => {
      setVote(result);
    });
  }
  function downVote() {
    patchVoteByID(article_id, { IncrementBy: "-1" }).then((result) => {
      setVote(result);
    });
  }

  return (
    <>
      <div>
        <figure>
          <img
            src={singleArticle.article_img_url}
            alt={`Image for ${singleArticle.authors} post`}
          />
        </figure>
        <div>
          <div className="title">
            <h3>{singleArticle.title}</h3>
          </div>
          <p>{singleArticle.body}</p>
          <div className="article_author">
            <p>{`Post created by: ${singleArticle.author}`}</p>
          </div>
          <div className="article_details">
            <p>{`Votes: ${vote} `}</p> <button onClick={upVote}>up vote</button>
            <button onClick={downVote}>down vote</button>
            <p>{`comments: ${singleArticle.comment_count} `}</p>
          </div>
          <p>{formatDate(singleArticle.created_at)}</p>
        </div>
        <div className="comments">
          {comments.map((comment) => {
            return (
              <div className="comment" key={comment.comment_id}>
                <h5>{comment.author}</h5>
                <p>{formatDate(comment.created_at)}</p>
                <p></p>
                <p>{comment.body}</p>
                <p>{`votes: ${comment.votes}`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { fetchCommentsByArticles } from "../utils/api";
import { formatDate } from "../utils/api";
export default function SingleArticle(props) {
  const [comments, setComments] = useState([]);

  const { singleArticle } = props;

  useEffect(() => {
    fetchCommentsByArticles(singleArticle.article_id).then((res) => {
      setComments(res);
    });
  }, []);

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
          <div className="article_author">
            <p>{singleArticle.author}</p>
          </div>
          <div className="article_details">
            <p>{`Votes: ${singleArticle.votes} `}</p>
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

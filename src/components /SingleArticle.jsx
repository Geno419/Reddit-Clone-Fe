import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCommentsByArticleId,
  fetchArticleByArticleId,
} from "../utils/api";
import { formatDate } from "../utils/functions";
import { SingleArticleCard, AddComments } from "./Index";
import LoadComments from "./LoadComments";
import {
  upVote,
  downVote,
  addComment,
  deleteComment,
  createDeleteButton,
} from "../utils/SingleArticleFunc";

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

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <article className="single_article">
          <SingleArticleCard
            singleArticle={singleArticle}
            vote={vote}
            upVote={() =>
              upVote(
                article_id,
                vote,
                upVoted,
                downVoted,
                setVote,
                setUpVoted,
                setDownVoted
              )
            }
            downVote={() =>
              downVote(
                article_id,
                vote,
                upVoted,
                downVoted,
                setVote,
                setUpVoted,
                setDownVoted
              )
            }
            comments={comments}
          />
          <AddComments
            addComment={(event) =>
              addComment(
                event,
                article_id,
                user,
                comments,
                setComments,
                commentMessageToUser
              )
            }
            user={user}
          />
          <div id="message_to_user" alert="alert"></div>

          <LoadComments
            comments={comments}
            createDeleteButton={(comment) =>
              createDeleteButton(user, comment, (currentComment) =>
                deleteComment(
                  currentComment,
                  comments,
                  setComments,
                  commentMessageToUser
                )
              )
            }
            formatDate={formatDate}
          />
        </article>
      )}
    </>
  );
}

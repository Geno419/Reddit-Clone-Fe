import React from "react";
import { formatDate } from "../utils/functions";

function SingleArticleCards({
  singleArticle,
  vote,
  upVote,
  downVote,
  comments,
}) {
  return (
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
  );
}

export default SingleArticleCards;

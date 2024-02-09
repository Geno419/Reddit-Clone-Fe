import React from "react";
import { Link } from "react-router-dom";

function ArticleList({ articles }) {
  return (
    <div className="all_Articles">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Link
            to={`/SingleArticle/${article.article_id}`}
            className="article"
            key={article.article_id}
          >
            <div className="article_details">
              <figure>
                <img src={article.image_url} alt={article.title} />
              </figure>
              <div className="article_info">
                <h2>{article.title}</h2>
                <p>Author: {article.author}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}

export default ArticleList;

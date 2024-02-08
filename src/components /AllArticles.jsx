import { useEffect, useState } from "react";
import { fetchAllArticles, fetchAllTopics } from "../utils/api";
import {
  handleSortOrderChange,
  handleSortCriteriaChange,
  sortArticles,
  handleTopicChange,
} from "../utils/functions";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [orderParams, setOrderParams] = useSearchParams();
  const paramSrtCriteria = orderParams.get("sortCriteria");
  const paramSortOrder = orderParams.get("sortOrder");
  const [sortCriteria, setSortCriteria] = useState(paramSrtCriteria || "date");
  const [sortOrder, setSortOrder] = useState(paramSortOrder);

  useEffect(() => {
    fetchAllArticles().then((articles) => {
      setAllArticles(articles);
      setLoading(false);
    });
    fetchAllTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  useEffect(() => {
    setOrderParams({
      sortCriteria: sortCriteria,
      sortOrder: sortOrder,
    });
  }, [sortCriteria, sortOrder]);

  return (
    <>
      <input type="text" placeholder="Create Post" />
      <div className="alter_article">
        <label>
          Filter by category:
          <select
            onChange={(event) => {
              handleTopicChange(event, navigate, setTopics);
            }}
          >
            <option value="/">All</option>
            {topics.map((topic) => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Sort by:
          <select
            onChange={(event) =>
              handleSortCriteriaChange(event, setSortCriteria)
            }
            value={sortCriteria}
          >
            <option value="date">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
      </div>
      <button
        className="sort_button"
        onClick={() => {
          handleSortOrderChange(setSortOrder, sortOrder);
        }}
      >
        {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="all_Articles">
          {allArticles.length > 0 ? (
            sortArticles(allArticles, sortCriteria, sortOrder).map(
              (article) => (
                <Link
                  to={`/SingleArticle/${article.article_id}`}
                  className="article"
                  key={article.article_id}
                >
                  <div className="article_details">
                    <figure>
                      <img src={article.article_img_url} />
                    </figure>
                    <section>
                      <div className="title">
                        <h3>{article.title}</h3>
                      </div>
                      <div className="article_author">
                        <p>{article.author}</p>
                      </div>
                    </section>
                  </div>
                  <div className="vote_comment">
                    <p className="votes">{`Votes: ${article.votes} `}</p>
                    <p>{`comments: ${article.comment_count} `}</p>
                  </div>
                </Link>
              )
            )
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      )}
    </>
  );
}

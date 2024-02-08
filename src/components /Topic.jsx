import { useEffect, useState } from "react";
import { fetchArticlesWithTopic, fetchAllTopics } from "../utils/api";
import {
  handleSortOrderChange,
  handleSortCriteriaChange,
  sortArticles,
  handleTopicChange,
} from "../utils/functions";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import NotFound from "./NotFound";

export default function Topic() {
  let { topic } = useParams();
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
    fetchArticlesWithTopic(topic)
      .then((articles) => {
        setAllArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        navigate("/NotFound");
      });
    fetchAllTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  useEffect(() => {
    fetchArticlesWithTopic(topic)
      .then((articles) => {
        setAllArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        navigate("/NotFound");
      });
  }, [topic]);

  useEffect(() => {
    setOrderParams({
      sortCriteria: sortCriteria,
      sortOrder: sortOrder,
    });
  }, [sortCriteria, sortOrder]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <input type="text" placeholder="Create Post" />
          <div className="alter_article">
            <label>
              Filter by category:
              <select
                value={topic}
                onChange={(event) => {
                  const selectedTopic = event.target.value;
                  handleTopicChange(event, navigate, selectedTopic);
                }}
              >
                <option value="/">All</option>
                {topics.map((topic) => (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </option>
                ))}
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
            onClick={() => handleSortOrderChange(setSortOrder, sortOrder)}
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>

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
                        <img
                          src={article.article_img_url}
                          alt={`Image for ${article.author}'s post`}
                        />
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
        </>
      )}
    </>
  );
}

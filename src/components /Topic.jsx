import { useEffect, useState } from "react";
import { fetchAllArticles, fetchAllTopics } from "../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Topic() {
  const { topic } = useParams();
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllArticles().then((articles) => {
      articles = articles.filter((article) => article.topic === topic);
      setAllArticles(articles);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchAllTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  function handleTopicChange(event) {
    const path = event.target.value;
    if (path === "/") {
      navigate(`/`);
    } else {
      navigate(`/topic/${path}`);
    }
    window.location.reload();
  }
  return (
    <>
      <input type="text" placeholder="Create Post" />
      <br />

      <label>
        Filter by category:
        <select value={topic} onChange={handleTopicChange}>
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="all_Articles">
          {allArticles.length > 0 ? (
            allArticles.map((article) => (
              <Link
                to={`/SingleArticle/${article.article_id}`}
                className="article"
                key={article.article_id}
              >
                <div className="article_details">
                  <figure>
                    <img
                      src={article.article_img_url}
                      alt={`Image for ${article.authors} post`}
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
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      )}
    </>
  );
}

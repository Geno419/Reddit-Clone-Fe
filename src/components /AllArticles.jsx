import { useEffect, useState } from "react";
import { fetchAllArticles, fetchAllTopics } from "../utils/api";
import { Link } from "react-router-dom";

export default function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [displayArticles, setDisplayArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchAllArticles().then((res) => {
      setAllArticles(res);
      setDisplayArticles(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchAllTopics().then((res) => {
      setTopics(res);
    });
  }, []);
  function handleTopicChange(event) {
    let selectedTopic = event.target.value;
    if (selectedTopic === "all") {
      setDisplayArticles(allArticles);
    } else {
      setDisplayArticles(() => {
        let newArr = [];
        allArticles.map((article) => {
          if (selectedTopic === article.topic) newArr.push(article);
        });
        return newArr;
      });
    }
  }
  return (
    <>
      <input type="text" placeholder="Create Post" />
      <br />

      <label>
        Filter by category:
        <select onChange={handleTopicChange}>
          <option value="all">All</option>
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
          {displayArticles.length > 0 ? (
            displayArticles.map((article) => (
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

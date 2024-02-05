import { useEffect, useState } from "react";
import { fetchAllArticles } from "./utils/api";
import { Link } from "react-router-dom";

export default function AllArticles(props) {
  const { setSingleArticle } = props;
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllArticles().then((res) => {
      setAllArticles(res);
      setLoading(false);
    });
  }, []);
  function handleClick(article) {
    setSingleArticle(article);
  }

  return (
    <>
      <h2>Articles</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="all_Articles">
          {allArticles.length > 0 ? (
            allArticles.map((article) => (
              <Link
                to="SingleArticle"
                className="article"
                onClick={() => {
                  handleClick(article);
                }}
              >
                <div key={article.article_id}>
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
                    <div article_author>
                      <p>{article.author}</p>
                    </div>
                    <div className="article_details">
                      <p>{`Votes: ${article.votes} `}</p>
                      <p>{`comments: ${article.comment_count} `}</p>
                    </div>
                  </section>
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

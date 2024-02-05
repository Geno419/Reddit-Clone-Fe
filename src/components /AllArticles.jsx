import { useEffect, useState } from "react";
import { fetchAllArticles } from "../utils/api";
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
  // function handleCategoryChange() {}
  return (
    <>
      <input type="text" placeholder="Create Post" />
      <br />

      {/* <label>
        Filter by category:
        <select onChange={handleCategoryChange}>
          <option value="all">All</option>
          {categories.map((category) => {
            return (
              <option value={category.category_name}>
                {category.category_name}
              </option>
            );
          })}
        </select>
      </label> */}

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
                key={article.article_id}
              >
                <div>
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
                    <div className="article_details">
                      <p className="votes">{`Votes: ${article.votes} `}</p>
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

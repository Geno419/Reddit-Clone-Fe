import React, { useEffect, useState } from "react";
import { fetchArticlesWithTopic, fetchAllTopics } from "../utils/api";
import {
  handleSortOrderChange,
  handleSortCriteriaChange,
  handleTopicChange,
} from "../utils/functions";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SortingOptions from "./SortingOptions";
import ArticleList from "./ArticleList";

function Topic() {
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
          <SortingOptions
            topics={topics}
            sortCriteria={sortCriteria}
            sortOrder={sortOrder}
            handleSortCriteriaChange={handleSortCriteriaChange}
            handleSortOrderChange={handleSortOrderChange}
            handleTopicChange={handleTopicChange}
            navigate={navigate}
          />
          <ArticleList allArticles={allArticles} />
        </>
      )}
    </>
  );
}

export default Topic;

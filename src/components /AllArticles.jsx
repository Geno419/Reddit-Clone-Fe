import { useEffect, useState } from "react";
import { InputForm, ArticleList, SortingOptions } from "./Index.js";
import { fetchAllArticles, fetchAllTopics } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleSortOrderChange,
  handleSortCriteriaChange,
  sortArticles,
  handleTopicChange,
} from "../utils/functions";

function AllArticles() {
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <InputForm />
          <SortingOptions
            topics={topics}
            sortCriteria={sortCriteria}
            sortOrder={sortOrder}
            handleSortCriteriaChange={handleSortCriteriaChange}
            handleSortOrderChange={handleSortOrderChange}
            handleTopicChange={handleTopicChange}
            navigate={navigate}
          />
          <ArticleList
            articles={sortArticles(allArticles, sortCriteria, sortOrder)}
          />
        </>
      )}
    </>
  );
}

export default AllArticles;

import React from "react";

function SortingOptions({
  topics,
  sortCriteria,
  sortOrder,
  handleSortCriteriaChange,
  handleSortOrderChange,
  handleTopicChange,
  navigate,
}) {
  return (
    <div className="alter_article">
      <label>
        Filter by category:
        <select
          onChange={(event) => {
            handleTopicChange(event, navigate, topics);
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
          onChange={(event) => handleSortCriteriaChange(event)}
          value={sortCriteria}
        >
          <option value="date">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </label>

      <button className="sort_button" onClick={handleSortOrderChange}>
        {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}

export default SortingOptions;

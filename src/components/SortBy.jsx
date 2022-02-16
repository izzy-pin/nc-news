import { useState } from "react";

const SortBy = ({ setSort_by, sort_by, setOrder, order }) => {
  const [sortByValue, setSortByValue] = useState(sort_by);
  const [orderValue, setOrderValue] = useState(order);

  const handleSortByChange = (event) => {
    setSortByValue(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrderValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSort_by(sortByValue);
    setOrder(orderValue);
  };
  return (
    <section className="SortBy__Section">
      <form onSubmit={handleSubmit}>
        <select
          aria-label="sorty by"
          className="ArticleListSort__select"
          defaultValue={sortByValue}
          onChange={handleSortByChange}
        >
          {" "}
          <option value="created_at">Date posted</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Likes</option>
        </select>
        <select
          aria-label="order by"
          className="ArticleListOrder__select"
          defaultValue={orderValue}
          onChange={handleOrderChange}
        >
          {" "}
          <option value="desc">
            {sortByValue === "created_at"
              ? "Newest to oldest"
              : "Highest to lowest"}
          </option>
          <option value="asc">
            {sortByValue === "created_at"
              ? "Oldest to newest"
              : "Lowest to highest"}
          </option>
        </select>

        <button className="ArticleListSort__button">Sort</button>
      </form>
    </section>
  );
};

export default SortBy;

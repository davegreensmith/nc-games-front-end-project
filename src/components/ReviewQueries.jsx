import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as api from '../utils/api';

export default function ReviewNav({ setSelectedCategory }) {
  const [categories, setCategories] = useState();
  const [isLoadingCats, setIsLoadingCats] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');

  const { search } = useLocation();
  let addToSearch = '?';
  if (/^\?category\b/i.test(search)) {
    addToSearch = search.match(/^[^&]*/) + '&';
    console.log(addToSearch, addToSearch);
  }

  useEffect(() => {
    api.fetchCategories().then((response) => {
      setCategories(response);
      setIsLoadingCats(false);
    });
  }, []);

  return (
    <section>
      {isLoadingCats ? (
        <p>loading...</p>
      ) : (
        <div className="navigation-sub">
          <form className="query-form">
            <fieldset className="sort-by-form">
              <div className="query-menu">
                <Link to={`/reviews${addToSearch}sort_by=created_at&order=${sortOrder}`} className="query-links">
                  Date
                </Link>
                <Link to={`/reviews${addToSearch}sort_by=comment_count&order=${sortOrder}`} className="query-links">
                  Comment_count
                </Link>
                <Link to={`/reviews${addToSearch}sort_by=votes&order=${sortOrder}`} className="query-links">
                  Votes
                </Link>
              </div>
              <div className="query-order-radio">
                <p>order</p>
                <div className="query-order">
                  <label htmlFor="asc">⬆️</label>
                  <input
                    type="radio"
                    id="asc"
                    name="order"
                    onClick={() => {
                      setSortOrder('asc');
                    }}
                  />
                </div>

                <div className="query-order">
                  <label htmlFor="desc">⬇️</label>
                  <input
                    type="radio"
                    id="desc"
                    name="order"
                    onClick={() => {
                      setSortOrder('desc');
                    }}
                    defaultChecked
                  />
                </div>
              </div>
              <legend>Sort by</legend>
            </fieldset>
          </form>
          <form className="query-form">
            <fieldset>
              {categories.map((category, index) => {
                return (
                  <Link
                    to={`/reviews?category=${category.slug}`}
                    key={index}
                    className="category-link"
                    onClick={(e) => {
                      setSelectedCategory(category.slug);
                    }}
                  >
                    {category.slug}
                  </Link>
                );
              })}
              <legend>Filter by Category</legend>
            </fieldset>
          </form>
        </div>
      )}
    </section>
  );
}

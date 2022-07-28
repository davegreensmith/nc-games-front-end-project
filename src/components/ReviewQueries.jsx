import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as api from '../utils/api';

export default function ReviewNav({ setSelectedCategory }) {
  const [categories, setCategories] = useState();
  const [isLoadingCats, setIsLoadingCats] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');

  const { search } = useLocation();
  let addToSearch = '?';
  if (/^\?category\b/i.test(search)) {
    addToSearch = search.match(/^[^&]*/) + '&';
  }

  const handleToggleOrder = (order) => {
    let newSearchStr = search;
    let oppOrder = '';
    if (order === 'asc') oppOrder = 'desc';
    if (order === 'desc') oppOrder = 'asc';

    if (search.endsWith(order)) {
      return newSearchStr;
    }

    if (search.endsWith(oppOrder)) {
      const re = new RegExp(oppOrder);
      newSearchStr = newSearchStr.replace(re, order);
      return newSearchStr;
    }

    if (search === '') {
      newSearchStr = `?order=${order}`;
      return newSearchStr;
    }
  };

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
              <div className="query-order">
                <p>order</p>
                <Link to={`/reviews${handleToggleOrder('asc')}`}>⬆️</Link>
                <Link to={`/reviews${handleToggleOrder('desc')}`}>⬇️</Link>
              </div>
              <legend>Sort by</legend>
            </fieldset>
          </form>
          <form className="query-form">
            <fieldset>
              {categories.map((category, index) => {
                return (
                  <Link
                    to={`/reviews?category=${category.slug}&order=desc`}
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

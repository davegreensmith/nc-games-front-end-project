import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as api from '../utils/api';

export default function ReviewNav({ setSelectedCategory }) {
  const [categories, setCategories] = useState();
  const [isLoadingCats, setIsLoadingCats] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrder_by, setSelectedOrder_by] = useState({ ascClass: '', descClass: 'selected' });
  const [selectedSort_by, setSelectedSort_by] = useState({ date: '', comment_count: '', votes: '' });

  const { search } = useLocation();
  let addToSearch = '?';
  if (/^\?category\b/i.test(search)) {
    addToSearch = search.match(/^[^&]*/) + '&';
  }

  const handleToggleOrder = (order) => {
    let newSearchStr = search;
    let oppOrder = '';
    if (order === 'asc') {
      oppOrder = 'desc';
    } else if (order === 'desc') {
      oppOrder = 'asc';
    }

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
                <Link
                  to={`/reviews${addToSearch}sort_by=created_at&order=${sortOrder}`}
                  className={`query-links${selectedSort_by.date}`}
                  onClick={() => {
                    setSelectedSort_by({ date: 'selected', comment_count: '', votes: '' });
                  }}
                >
                  Date
                </Link>
                <Link
                  to={`/reviews${addToSearch}sort_by=comment_count&order=${sortOrder}`}
                  className={`query-links${selectedSort_by.comment_count}`}
                  onClick={() => {
                    setSelectedSort_by({ date: '', comment_count: 'selected', votes: '' });
                  }}
                >
                  Comment_count
                </Link>
                <Link
                  to={`/reviews${addToSearch}sort_by=votes&order=${sortOrder}`}
                  className={`query-links${selectedSort_by.votes}`}
                  onClick={() => {
                    setSelectedSort_by({ date: '', comment_count: '', votes: 'selected' });
                  }}
                >
                  Votes
                </Link>
              </div>
              <div className="query-order">
                <p>order</p>
                <Link
                  to={`/reviews${handleToggleOrder('asc')}`}
                  className={`order_by${selectedOrder_by.ascClass}`}
                  onClick={() => {
                    setSortOrder('asc');
                    setSelectedOrder_by({ ascClass: 'selected', descClass: '' });
                  }}
                >
                  ⬆️
                </Link>
                <Link
                  to={`/reviews${handleToggleOrder('desc')}`}
                  className={`order_by${selectedOrder_by.descClass}`}
                  onClick={() => {
                    setSortOrder('desc');
                    setSelectedOrder_by({ ascClass: '', descClass: 'selected' });
                  }}
                >
                  ⬇️
                </Link>
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

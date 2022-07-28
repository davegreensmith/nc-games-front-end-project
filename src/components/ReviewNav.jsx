import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';

export default function ReviewNav({ setSelectedCategory }) {
  const [categories, setCategories] = useState();
  const [isLoadingCats, setIsLoadingCats] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');

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
          <div className="nav-sub-categories-filter">
            <form action="">
              <p>Filter by Category</p>
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
            </form>
          </div>
          <div className="nav-sub-sort-by">
            <form action=""></form>
            <p>Sort by</p>
          </div>
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';

export default function ReviewNav({ setSelectedCategory }) {
  const [categories, setCategories] = useState();
  const [isLoadingCats, setIsLoadingCats] = useState(true);

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
        </div>
      )}
    </section>
  );
}

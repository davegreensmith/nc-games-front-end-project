import { useState } from 'react';

import ReviewQueries from './ReviewQueries';
import ReviewHolder from './ReviewHolder';
import ReviewFull from './ReviewFull';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { review_id } = useParams();

  return (
    <section className="reviews-container">
      {review_id ? (
        <>
          <ReviewFull />
        </>
      ) : (
        <>
          <ReviewQueries setSelectedCategory={setSelectedCategory} />
          <ReviewHolder selectedCategory={selectedCategory} />
        </>
      )}
    </section>
  );
}

import { useEffect, useState } from 'react';

import ReviewNav from './ReviewNav';
import ReviewHolder from './ReviewHolder';
import ReviewFull from './ReviewFull';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { review_id } = useParams();

  console.log(review_id, '<<< review_id');

  return (
    <section>
      {review_id ? (
        <>
          <ReviewFull />
        </>
      ) : (
        <>
          <ReviewNav setSelectedCategory={setSelectedCategory} />
          <ReviewHolder selectedCategory={selectedCategory} />
        </>
      )}
    </section>
  );
}

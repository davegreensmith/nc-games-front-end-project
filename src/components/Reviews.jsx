import { useState } from 'react';

import ReviewNav from './ReviewNav';
import ReviewHolder from './ReviewHolder';

export default function Reviews() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section>
      <ReviewNav setSelectedCategory={setSelectedCategory} />
      <ReviewHolder selectedCategory={selectedCategory} />
    </section>
  );
}

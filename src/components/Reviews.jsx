import * as api from '../utils/api';
import { useEffect, useState } from 'react';

import ReviewNav from './ReviewNav';
import ReviewHolder from './ReviewHolder';

export default function Reviews() {
  return (
    <section>
      <ReviewNav />
      <ReviewHolder />
    </section>
  );
}

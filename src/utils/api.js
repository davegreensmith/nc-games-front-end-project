import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'https://nc-games-dg.herokuapp.com/api',
});

export const fetchReviews = () => {
  return usersApi.get('/reviews').then(({ data }) => {
    return data.reviews;
  });
};

export const fetchCategories = () => {
  return usersApi.get('/categories').then(({ data }) => {
    return data.categories;
  });
};

export const fetchReviewsByCategory = (search) => {
  return usersApi.get(`/reviews/${search}`).then(({ data }) => {
    return data.reviews;
  });
};

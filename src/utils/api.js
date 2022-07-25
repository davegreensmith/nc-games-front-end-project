import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'https://nc-games-dg.herokuapp.com/api',
});

export const fetchReviews = () => {
  return usersApi.get('reviews').then(({ data }) => {
    return data.reviews;
  });
};

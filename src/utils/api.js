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

export const fetchReviewById = (review_id) => {
  return usersApi.get(`/review/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const updateVotesByReviewId = (review_id, inc_votes) => {
  const body = { inc_votes };
  return usersApi.patch(`/reviews/${review_id}`, body).then(({ data }) => {
    return data;
  });
};

export const fetchCommentsByReviewId = (review_id) => {
  return usersApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const fetchUsers = () => {
  return usersApi.get('/users').then(({ data }) => {
    return data.users;
  });
};

export const postReview = (review_id, body) => {
  return usersApi.post(`/reviews/${review_id}/comments`, body).then(({ request: { status } }) => {
    return { status };
  });
};

export const deleteComment = (comment_id) => {
  return usersApi.delete(`/comments/${comment_id}`).then(({ status }) => {
    return { status };
  });
};

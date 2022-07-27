export const formatDate = (created_at) => {
  const d = new Date(created_at);
  return d.toLocaleDateString('en-GB');
};

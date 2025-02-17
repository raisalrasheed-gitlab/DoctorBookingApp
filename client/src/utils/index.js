export const checkToken = () => {
  const token = localStorage.getItem('token');
  if (token) return true;
  else return false;
};
export const getId = () => {
  return localStorage.getItem('id');
};

import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
export default axiosInstance;

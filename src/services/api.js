import axios from 'axios'

let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: localStorage.getItem("Authorization"),
    }
});

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
        if(error.config.url === 'login' && error.response.status === 403) {
            localStorage.removeItem("Authorization"); 
            window.location.href = '/';
        }
    return Promise.reject(error);
});

export default api
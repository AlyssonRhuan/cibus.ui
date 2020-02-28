import axios from 'axios'

let api = axios.create({
    baseURL: 'https://cibusserver.herokuapp.com/',
    //baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: localStorage.getItem("Authorization"),
    }
});

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(localStorage.getItem("Authorization") !== null){
        if(error.response === null || error.response.status === null || error.response.status === 403) {
            localStorage.removeItem("Authorization"); 
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});

export default api
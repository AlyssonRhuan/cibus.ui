import axios from 'axios';
import Auth from '../services/Auth';
import Toast from '../components/Toast';

let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    Toast.error(error.message);

    if (error.message === "Network Error") {
        localStorage.removeItem("Authorization");
        Auth.onLogout();
    }
    else if (error.response) {
        if (error.response.status && error.response.status === 403) {
            localStorage.removeItem("Authorization");
            Auth.onLogout();
        }
    }
    
    return Promise.reject(error);
});

export default api
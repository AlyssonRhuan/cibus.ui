import axios from 'axios';
import Auth from '../storage/Auth.storage';
import Toast from '../components/Toast';

let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

function error(e) {
  Toast.error(e.response ? e.response.data.message : e.message);
  console.error(e.response ? e.response.data.message : e.message);
}

api.interceptors.response.use(function (response) {
    return response;
}, function (e) {
    error(e);

    if (e.message === "Network Error") {
        localStorage.removeItem("Authorization");
        Auth.onLogout();
        window.location.href = "/unavailableservice";
    }
    else if (e.response) {
        if (e.response.status && e.response.status === 403) {
            localStorage.removeItem("Authorization");
            Auth.onLogout();
        }
    }
    
    return Promise.reject(error);
});

export default api
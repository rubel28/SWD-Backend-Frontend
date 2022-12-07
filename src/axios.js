/**
 * Created by Baharul Islam on 12/08/2022.
 */
import axios from 'axios';
import store from './store';
import router from './router';
import useShowMessage from "@/composables/useShowMessage";

const { showAlert } = useShowMessage();

const axiosClient = axios.create({
    baseURL: `${process.env.VUE_APP_SWD_API_BASE_URL}/api/v1`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
    },
    error => {
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(response => {
    if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    console.log(error.response);
    if (error.response.status) {
        switch (error.response.status) {
            case 400:
                //do something
                showAlert(error.response.statusText,'error');// type => success/error
                break;
            case 401:
                store.dispatch('login/clearAuthData').then();
                showAlert(error.response.statusText,'error');// type => success/error
                router.push({name: 'logout'}).then();
                break;
            case 403:
                store.dispatch('login/clearAuthData').then();
                showAlert(error.response.statusText,'error');// type => success/error
                router.push({name: 'logout'}).then();
                break;
            case 404:
                router.push({name:'notFound'}).then();
                break;
            case 502:
            //do something
        }
        return Promise.reject(error.response);
    }
})

export default axiosClient;



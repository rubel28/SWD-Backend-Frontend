import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        user: {
            data: JSON.parse(localStorage.getItem('userData')),
            token: localStorage.getItem("TOKEN"),
            loginId: localStorage.getItem("loginId"),
            //token: null,
        },
        loginSubmit: {
            loading: false
        },
    },
    getters: {

    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("userData");
            localStorage.removeItem("loginId");
        },
        setUser: (state, user) => {
            state.user.data = user;
            localStorage.setItem('userData', JSON.stringify(user));
        },
        setToken: (state, token) => {
            state.user.token = token;
            localStorage.setItem('TOKEN', token);
        },
        setLoginId: (state, login) => {
            state.user.loginId = login;
            localStorage.setItem('loginId', login);
        },
        setLoginSubmitLoading: (state, loading) => {
            state.loginSubmit.loading = loading;
        },
    },
    actions: {
        login({commit},user){
            commit('setLoginSubmitLoading',true);
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    //console.log(data.data.user)
                    commit('setUser', data.data.user);
                    commit('setToken', data.data.access_token);
                    commit('setLoginId', user.login);
                    return data;
                });
        },
        logout({commit}) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    return response;
                })
        },
    }
}

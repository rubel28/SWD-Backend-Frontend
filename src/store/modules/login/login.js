import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        user: {
            data: {},
            token: localStorage.getItem("TOKEN"),
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
        },
        setUser: (state, user) => {
            state.user.data = user;
        },
        setToken: (state, token) => {
            state.user.token = token;
            localStorage.setItem('TOKEN', token);
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

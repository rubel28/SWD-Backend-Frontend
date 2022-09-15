import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        loginHistory: {
            loading: false,
            data: []
        },
    },
    getters: {

    },
    mutations: {
        setLoginHistory: (state, loginHistory) => {
            state.loginHistory.data = loginHistory;
        },
        setLoginHistoryLoading: (state, loading) => {
            state.loginHistory.loading = loading;
        },
    },
    actions: {
        getLoginHistory({commit}){
            commit('setLoginHistoryLoading',true);
            return axiosClient.get('/user-login-histories')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setLoginHistory', res.data.data);
                    commit("setLoginHistoryLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setLoginHistoryLoading", false);
                    throw err;
                });
        },
    }
}

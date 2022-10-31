import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        states: {
            loading: false,
            data: []
        },
        state: {
            loading: false,
            data: {}
        },
        buttonLoading: {
            loading: false,
        },
        allStateByCountry: {
            data: []
        },
    },
    getters: {

    },
    mutations: {
        setStates: (state, states) => {
            state.states.data = states;
        },
        setState: (state, states) => {
            state.state.data = states;
        },
        setStatesLoading: (state, loading) => {
            state.states.loading = loading;
        },
        setCountryLoading: (state, loading) => {
            state.country.loading = loading;
        },
        setButtonLoading: (state, loading) => {
            state.buttonLoading.loading = loading;
        },
        setAllStateByCountry: (state, states) => {
            state.allStateByCountry.data = states;
        },
    },
    actions: {
        getStates({commit}){
            commit('setStatesLoading',true);
            return axiosClient.get('/states')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setStates', res.data.data);
                    commit('setStatesLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setStatesLoading", false);
                    throw err;
                });
        },
        getState({commit},id){
            return axiosClient.get(`/states/${id}`)
                .then((res) => {
                    //console.log(res.data)
                    commit('setState', res.data.data);
                    return res;
                })
        },
        saveState({ commit }, state) {
            delete state.id;
            commit('setButtonLoading',true)
            let response = axiosClient.post("/states", state).then((res) => {
                if(res.data.data.status === true){
                    commit('setState', res.data.data.states);
                }
                    return res;
                });
            return response;
        },
        updateState({ commit }, state) {            
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/states/${state.id}`, state).then((res) => {
                if(res.data.data.status === true){
                    commit('setState', res.data.data.states);
                }
                    return res;
                });

            return response;
        },
        deleteState({ commit }, param) {
            param.login = localStorage.getItem('loginId');
            commit('setButtonLoading',true);
            return axiosClient.post("/states/state-destroy",param).then((res) => {
                return res;
            }).catch((err) => {
                commit("setButtonLoading", false);
                throw err;
            });
        },
        getAllSateByCountry({commit}, id){
            //console.log(param)
            return axiosClient.get(`/states?country_id=${id}`)
                .then((res) => {
                    //console.log(res.data.data)
                    if(res.data.success === true){
                        commit('setAllStateByCountry', res.data.data.states);
                    }
                    return res;
                })
                .catch((err) => {
                    throw err;
                });
        },
    }
}

import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        banks: {
            loading: false,
            data: []
        },
        bank: {
            loading: false,
            data: {}
        },
        buttonLoading: {
            loading: false,
        },
    },
    getters: {

    },
    mutations: {
        setBanks: (state, banks) => {
            state.banks.data = banks;
        },
        setBank: (state, bank) => {
            state.bank.data = bank;
        },        
        setBankLoading: (state, loading) => {
            state.bank.loading = loading;
        },
        setButtonLoading: (state, loading) => {
            state.buttonLoading.loading = loading;
        },
    },
    actions: {
        getBanks({commit}){
            commit('setBankLoading',true);
            return axiosClient.get('/banks')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setBanks', res.data.data);
                    commit('setBankLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setBankLoading", false);
                    throw err;
                });
        },
        getBank({commit},id){
            commit('setBankLoading',true);
            return axiosClient.get(`/banks/${id}`)
                .then((res) => {
                    //console.log(res.data)
                    commit('setBank', res.data.data);
                    commit('setBankLoading',false);
                    return res;
                })
        },
        saveBank({ commit }, bank) {
            commit('setButtonLoading',true)
            return axiosClient.post("/banks", bank).then((res) => {
                    commit('setBank', res.data.data)
                    return res;
                });
        },
        updateBank({ commit }, bank) {
            //console.log(country)
            if(bank.bank_logo){
                delete bank.bank_logo;
            }
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/banks/${bank.id}`, bank).then((res) => {
                    commit('setBank', res.data.data)
                    return res;
                });

            return response;
        },
        deleteBank({ dispatch }, id) {
            return axiosClient.delete(`/banks/${id}`).then((res) => {
                return res;
            });
        },
    }
}

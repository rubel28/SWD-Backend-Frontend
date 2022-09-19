import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        provinces: {
            loading: false,
            data: []
        },
        province: {
            loading: false,
            data: {}
        },
        buttonLoading: {
            loading: false,
        },
        country:{
            loading: false,
            data: []
        },
    },
    getters: {

    },
    mutations: {
        setProvinces: (state, provinces) => {
            state.provinces.data = provinces;
        },
        setProvince: (state, province) => {
            state.province.data = province;
        },
        setProvincesLoading: (state, loading) => {
            state.provinces.loading = loading;
        },
        setCountryLoading: (state, loading) => {
            state.country.loading = loading;
        },
        setButtonLoading: (state, loading) => {
            state.buttonLoading.loading = loading;
        },
        setCountries: (state, country) => {
            state.country.data = country;
        },
    },
    actions: {
        getProvinces({commit}){
            commit('setProvincesLoading',true);
            return axiosClient.get('/provinces')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setProvinces', res.data.data);
                    commit('setProvincesLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setProvincesLoading", false);
                    throw err;
                });
        },
        getProvince({commit},id){
            return axiosClient.get(`/provinces/${id}`)
                .then((res) => {
                    //console.log(res.data)
                    commit('setProvince', res.data.data);
                    return res;
                })
        },
        saveProvince({ commit }, province) {
            commit('setButtonLoading',true)
            return axiosClient.post("/provinces", province).then((res) => {
                    commit('setProvince', res.data.data)
                    return res;
                });
        },
        updateProvince({ commit }, province) {            
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/provinces/${province.id}`, province).then((res) => {
                    commit('setProvince', res.data.data)
                    return res;
                });

            return response;
        },
        deleteProvince({ dispatch }, id) {
            return axiosClient.delete(`/provinces/${id}`).then((res) => {
                return res;
            });
        },
        getCountries({commit}){
            return axiosClient.get('/select-box-countries')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setCountries', res.data.data);
                    return res;
                })
                .catch((err) => {
                    throw err;
                });
        },
    }
}

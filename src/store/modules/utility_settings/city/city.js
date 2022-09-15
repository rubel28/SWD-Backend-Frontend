import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        cities: {
            loading: false,
            data: []
        },
        city: {
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
        province:{
            data: []
        },
    },
    getters: {

    },
    mutations: {
        setCities: (state, cities) => {
            state.cities.data = cities;
        },
        setCity: (state, city) => {
            state.city.data = city;
        },
        setCitiesLoading: (state, loading) => {
            state.cities.loading = loading;
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
        setProvinces: (state, city) => {
            state.city.data = city;
        },
    },
    actions: {
        getCities({commit}){
            commit('setCitiesLoading',true);
            return axiosClient.get('/cities')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setCities', res.data.data);
                    commit('setCitiesLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setCitiesLoading", false);
                    throw err;
                });
        },
        getCity({commit},id){
            return axiosClient.get(`/cities/${id}`)
                .then((res) => {
                    commit('setCity', res.data.data);
                    return res;
                })
        },
        saveCity({ commit }, city) {
            commit('setButtonLoading',true)
            return axiosClient.post("/cities", city).then((res) => {
                    commit('setCity', res.data.data)
                    return res;
                });
        },
        updateCity({ commit }, city) {            
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/cities/${city.id}`, city).then((res) => {
                    commit('setCity', res.data.data)
                    return res;
                });

            return response;
        },
        deleteCity({ dispatch }, id) {
            return axiosClient.delete(`/cities/${id}`).then((res) => {
                return res;
            });
        },
        getCountries({commit}){
            commit('setCountryLoading',true);
            return axiosClient.get('/countries')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setCountries', res.data.data);
                    commit('setCountryLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit('setCountryLoading',false);
                    throw err;
                });
        },
        getProvinces({commit}, id){
            return axiosClient.get(`/province-by-country/${id}`)
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setProvinces', res.data.data);
                    return res;
                })
                .catch((err) => {
                    throw err;
                });
        },
    }
}

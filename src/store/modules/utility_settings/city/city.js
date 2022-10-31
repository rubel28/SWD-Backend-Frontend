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
            delete city.id;
            commit('setButtonLoading',true)
            let response = axiosClient.post("/cities", city).then((res) => {
                if(res.data.data.status === true){
                    commit('setCity', res.data.data.cities);
                }
                return res;
            });
            return response;
        },
        updateCity({ commit }, city) {
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/cities/${city.id}`, city).then((res) => {
                if(res.data.data.status === true){
                    commit('setCity', res.data.data.cities);
                }
                return res;
            });

            return response;            
        },
        deleteCity({ commit }, param) {
            param.login = localStorage.getItem('loginId');
            commit('setButtonLoading',true);
            return axiosClient.post("/cities/city-destroy",param).then((res) => {
                return res;
            }).catch((err) => {
                commit("setButtonLoading", false);
                throw err;
            });
        },
    }
}

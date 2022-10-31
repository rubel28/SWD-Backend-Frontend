import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        countries: {
            loading: false,
            data: []
        },
        country: {
            loading: false,
            data: {}
        },
        buttonLoading: {
            loading: false,
        },
        allCountry:{
            loading: false,
            data: []
        },
    },
    getters: {

    },
    mutations: {
        setCountries: (state, countries) => {
            state.countries.data = countries;
        },
        setCountry: (state, country) => {
            state.country.data = country;
        },
        setCountriesLoading: (state, loading) => {
            state.countries.loading = loading;
        },
        setCountryLoading: (state, loading) => {
            state.country.loading = loading;
        },
        setButtonLoading: (state, loading) => {
            state.buttonLoading.loading = loading;
        },
        setAllCountries: (state, country) => {
            state.allCountry.data = country;
        },
    },
    actions: {
        getCountries({commit}){
            commit('setCountriesLoading',true);
            return axiosClient.get('/countries')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setCountries', res.data.data);
                    commit('setCountriesLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setCountriesLoading", false);
                    throw err;
                });
        },
        getCountry({commit},id){
            commit('setCountryLoading',true);
            return axiosClient.get(`/countries/${id}`)
                .then((res) => {
                    //console.log(res.data)
                    commit('setCountry', res.data.data);
                    return res;
                })
        },
        saveCountry({ commit }, country) {
            //console.log(country)
            delete country.id;
            commit('setButtonLoading',true)
            let response = axiosClient.post("/countries", country).then((res) => {
                if(res.data.data.status === true){
                    commit('setCountry', res.data.data.countries);
                }
                    return res;
                });
            return response;
        },
        updateCountry({ commit }, country) {
            //console.log(country)
            /*if(country.country_logo){
                delete country.country_logo;
            }*/
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/countries/${country.id}`, country).then((res) => {
                if(res.data.data.status === true){
                    commit('setCountry', res.data.data.countries);
                }
                    return res;
                });

            return response;
        },
        deleteCountry({ commit }, param) {
            param.login = localStorage.getItem('loginId');
            commit('setButtonLoading',true);
            return axiosClient.post("/countries/country-destroy",param).then((res) => {
                //dispatch('getCountries')
                return res;
            }).catch((err) => {
                commit("setButtonLoading", false);
                throw err;
            });
        },
        getAllCountries({commit}){
            return axiosClient.get('/country_list')
                .then((res) => {
                    //console.log(res.data.data)
                    if(res.data.success === true){
                        commit('setAllCountries', res.data.data.countries);
                    }
                    return res;
                })
                .catch((err) => {
                    throw err;
                });
        },
    }
}

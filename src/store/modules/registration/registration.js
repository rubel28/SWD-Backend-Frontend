import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        otp: {
            loading: false,
            data: []
        },
        registration: {
            data: [],
            loading: false
        },
        mailVerify: {
            data: []
        },
    },
    getters: {

    },
    mutations: {
        setOtp: (state, otp) => {
            state.otp.data = otp;
        },
        setOtpLoading: (state, loading) => {
            state.otp.loading = loading;
        },
        setRegistration: (state, res) => {
            state.registration.data = res;
        },
        setRegistrationLoading: (state, loading) => {
            state.registration.loading = loading;
        },
        setMailVerify: (state, verify) => {
            state.mailVerify.data = verify;
        },        
        
    },
    actions: {
        sendOtp({ commit }, otp) {
            //console.log(otp);
            commit('setOtpLoading',true);
            let response = axiosClient.post("/otp-generate", otp).then((res) => {
                console.log(res.data);
                if(typeof res.data.success !== 'undefined' && res.data.success === true){
                    commit('setOtp', res.data.data);
                }
                return res;
                });
            return response;
        },
        saveRegistration({ commit }, params) {
            //console.log(otp);
            commit('setRegistrationLoading',true);
            let response = axiosClient.post("/register", params).then((res) => {
                //console.log(res.data);
                if(typeof res.data.success !== 'undefined' && res.data.success === true){
                    commit('setRegistration', res.data.data);
                }
                return res;
            });
            return response;
        },
        getMailVerify({commit},token){
            //commit('setRoleLoading',true);
            return axiosClient.get(`/email-verify/${token}`)
                .then((res) => {
                    //console.log(res.data)
                    if(typeof res.data.success !== 'undefined' && res.data.success === true){
                        commit('setMailVerify', res.data);
                    }
                    //commit('setRoleLoading',false);
                    return res;
                })
        },
    }
}

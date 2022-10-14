import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        branches: {
            loading: false,
            data: []
        },
        branch: {
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
        setBranches: (state, branches) => {
            state.branches.data = branches;
        },
        setBranch: (state, branch) => {
            state.branch.data = branch;
        },        
        setBranchLoading: (state, loading) => {
            state.branch.loading = loading;
        },
        setButtonLoading: (state, loading) => {
            state.buttonLoading.loading = loading;
        },
    },
    actions: {
        getBranches({commit}){
            commit('setBranchLoading',true);
            return axiosClient.get('/branches')
                .then((res) => {
                    //console.log(res.data.data)
                    commit('setBranches', res.data.data);
                    commit('setBranchLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setBranchLoading", false);
                    throw err;
                });
        },
        getBranch({commit},id){
            commit('setBranchLoading',true);
            return axiosClient.get(`/branches/${id}`)
                .then((res) => {
                    //console.log(res.data)
                    commit('setBranch', res.data.data);
                    commit('setBranchLoading',false);
                    return res;
                })
        },
        saveBranch({ commit }, branch) {
            commit('setButtonLoading',true)
            return axiosClient.post("/branches", branch).then((res) => {
                    commit('setBranch', res.data.data)
                    return res;
                });
        },
        updateBranch({ commit }, branch) {
            
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/branches/${branch.id}`, branch).then((res) => {
                    commit('setBranch', res.data.data)
                    return res;
                });

            return response;
        },
        deleteBranch({ dispatch }, id) {
            return axiosClient.delete(`/branches/${id}`).then((res) => {
                return res;
            });
        },
    }
}

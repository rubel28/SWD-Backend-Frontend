import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        permissions: {
            loading: false,
            data: []
        },
        permission: {
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
        setPermissions: (state, permissions) => {
            state.permissions.data = permissions;
        },
        setPermission: (state, permission) => {
            state.permission.data = permission;
        },
        setPermissionsLoading: (state, loading) => {
            state.permissions.loading = loading;
        },
        setPermissionLoading: (state, loading) => {
            state.permission.loading = loading;
        },
        setButtonLoading: (state, loading) => {
            state.buttonLoading.loading = loading;
        },
    },
    actions: {
        getPermissions({commit}){
            commit('setPermissionsLoading',true);
            return axiosClient.get('/permissions')
                .then((res) => {
                    //console.log(res.data.data.permissions)
                    commit('setPermissions', res.data.data);
                    commit('setPermissionsLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setPermissionsLoading", false);
                    throw err;
                });
        },
        getPermission({commit},id){
            commit('setPermissionLoading',true);
            return axiosClient.get(`/permissions/${id}`)
                .then((res) => {
                    //console.log(res.data)
                    if(res.data.data.status === true){
                        commit('setPermission', res.data.data.permissions);
                    }
                    commit('setPermissionLoading',false);
                    return res;
                })
        },
        savePermission({ commit }, permission) {
            //console.log(country)
            delete permission.id;
            commit('setButtonLoading',true)
            let response = axiosClient.post("/permissions", permission).then((res) => {
                if(res.data.data.status === true){
                    commit('setPermission', res.data.data.permissions);
                }
                    return res;
                });
            return response;
        },
        updatePermission({ commit }, permission) {
            //console.log(permission);
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/permissions/${permission.id}`, permission).then((res) => {
                    //console.log(res.data.data);
                    if(res.data.data.status === true){
                        commit('setPermission', res.data.data.permissions);
                    }                
                    return res;
                });

            return response;
        },
        deletePermission({ commit }, param) {
            param.login = localStorage.getItem('loginId');
            commit('setButtonLoading',true);
            return axiosClient.post("/permissions/permission-destroy",param).then((res) => {
                return res;
            }).catch((err) => {
                commit("setButtonLoading", false);
                throw err;
            });
        },
    }
}

import axiosClient from "@/axios";

export default {
    namespaced: true,
    state: {
        roles: {
            loading: false,
            data: []
        },
        role: {
            loading: false,
            data: {}
        },
        buttonLoading: {
            loading: false,
        },
        permissions: {
            loading: false,
            data: []
        },
        rolePermissions: {
            data: [],
            loading: false,
        },
    },
    getters: {

    },
    mutations: {
        setRoles: (state, roles) => {
            state.roles.data = roles;
        },
        setRole: (state, role) => {
            state.role.data = role;
        },
        setRolesLoading: (state, loading) => {
            state.roles.loading = loading;
        },
        setRoleLoading: (state, loading) => {
            state.role.loading = loading;
        },
        setButtonLoading: (state, loading) => {
            state.buttonLoading.loading = loading;
        },
        setPermissions: (state, permissions) => {
            state.permissions.data = permissions;
        },
        setPermissionsLoading: (state, loading) => {
            state.permissions.loading = loading;
        },
        setRolePermissions: (state, permissions) => {
            state.rolePermissions.data = permissions;
        },
        setRolePermissionsLoading: (state, loading) => {
            state.rolePermissions.loading = loading;
        },
    },
    actions: {
        getRoles({commit}){
            commit('setRolesLoading',true);
            return axiosClient.get('/roles')
                .then((res) => {
                    //console.log(res.data.data.roles)
                    commit('setRoles', res.data.data);
                    commit('setRolesLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setRolesLoading", false);
                    throw err;
                });
        },
        getRole({commit},id){
            commit('setRoleLoading',true);
            return axiosClient.get(`/roles/${id}`)
                .then((res) => {
                    //console.log(res.data)
                    if(res.data.data.status === true){
                        commit('setRole', res.data.data.roles);
                    }
                    commit('setRoleLoading',false);
                    return res;
                })
        },
        saveRole({ commit }, role) {
            //console.log(country)
            delete role.id;
            commit('setButtonLoading',true)
            let response = axiosClient.post("/roles", role).then((res) => {
                if(res.data.data.status === true){
                    commit('setRole', res.data.data.roles);
                }
                    return res;
                });
            return response;
        },
        updateRole({ commit }, role) {
            //console.log(role);
            commit('setButtonLoading',true)
            let response = axiosClient.put(`/roles/${role.id}`, role).then((res) => {
                    //console.log(res.data.data);
                    if(res.data.data.status === true){
                        commit('setRole', res.data.data.roles);
                    }                
                    return res;
                });

            return response;
        },
        deleteRole({ commit }, param) {
            param.login = localStorage.getItem('loginId');
            commit('setButtonLoading',true);
            return axiosClient.post("/roles/role-destroy",param).then((res) => {
                return res;
            }).catch((err) => {
                commit("setButtonLoading", false);
                throw err;
            });
        },
        getPermissions({commit}){
            commit('setPermissionsLoading',true);
            return axiosClient.get('/permissions')
                .then((res) => {
                    //console.log(res.data.data.roles)
                    if(res.data.data.status === true){
                        commit('setPermissions', res.data.data.permissions);
                    }
                    commit('setPermissionsLoading',false);
                    return res;
                })
                .catch((err) => {
                    commit("setPermissionsLoading", false);
                    throw err;
                });
        },
        getRolePermissions({commit},id){
            commit('setRolePermissionsLoading',true);
            return axiosClient.get(`/roles/${id}/role-permissions`)
                .then((res) => {
                    //console.log(res.data)
                    if(res.data.data.status === true){
                        commit('setRolePermissions', res.data.data.rolePermissions);
                    }
                    commit('setRolePermissionsLoading',false);
                    return res;
                }).catch((err) => {
                    commit("setRolePermissionsLoading", false);
                    throw err;
                });
        },
        saveRolePermission({ commit },permission) {
            let id = permission.id;
            delete permission.id;            
            commit('setButtonLoading',true);
            let response = axiosClient.post(`/roles/${id}/store-role-permissions`, permission).then((res) => {
                return res;
            });
            return response;
        },
    }
}

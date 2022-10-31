<template>
    <teleport to="#breadcrumb">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="javascript:">
                                    <i data-feather="home"></i>
                                </a>
                            </li>
                            <li class="breadcrumb-item"><a href="/roles">Users</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><span>Add/Edit Permissions</span></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
    </teleport>
    <Loader v-if="loading"></Loader>
    <div class="layout-px-spacing">
        <div class="roles-container layout-top-spacing">
        <form @submit.prevent="submit_form">
            <div class="role-content">
                <div class="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
                    <div class="row">
<!--                        <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <div class="section role-info">
                                <div class="info">
                                    <h5 class="">Role Information</h5>
                                    <div class="row">
                                        <div class="col-md-11 mx-auto">
                                            <div class="row">
                                                &lt;!&ndash; Name &ndash;&gt;
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label id="role_name" for="role-name">Role Name</label>
                                                        <input ref="role_name" v-model="form.role_name" id="role-name" type="text" class="form-control" placeholder="Role Name *"
                                                               :class="[is_submit_form ? (form.role_name ? 'is-valid' : 'is-invalid') : '']" />
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please fill the role name</div>
                                                    </div>
                                                </div>
                                                &lt;!&ndash;/ Name &ndash;&gt;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                        <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <div class="section permission">
                                <div class="info">
                                    <div class="row underline">
                                        <div class="col-md-8">
                                            <h5 class="">{{`Permissions (${role_data.name??''})`}}</h5>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="search">
                                                <input type="text" v-model.trim="search_permission" class="input-search form-control" v-on:keyup="search_permissions()" placeholder="Search Here..." />
                                            </div>
                                        </div>
                                    </div>                                    
                                    <div class="row">
                                        <div class="col-md-12 mx-auto">
                                            <div class="permission-container">
                                                <div class="accordion permission-list">
                                                    <div class="action-center">
                                                        <div class="checkbox-primary new-control custom-control custom-checkbox">
                                                            <input id="chkALl" type="checkbox" :checked="check_all_checkbox" class="custom-control-input" @change="check_all($event.target.checked)" />
                                                            <label class="custom-control-label" for="chkALl">
                                                                <span class="ms-2">Check All</span>
                                                            </label>
                                                        </div>                                                        
                                                    </div>

                                                    <div class="permission-box">
                                                        <div class="row row-item">
<!--                                                        <perfect-scrollbar class="permission-box-scroll" id="ct">-->                                                        
                                                            <div v-for="(item, index) in filtered_permission_list" :key="item.id + '' + index" class="col-md-3 permission-item" >
<!--                                                                <div class="animated fadeInUp">-->
                                                                    <div class="d-flex permission-item-inner">
                                                                        <div class="checkbox-primary custom-control custom-checkbox">
                                                                            <input type="checkbox" :id="`chk-${item.id}`" v-model="form.permissions" class="custom-control-input" :value="item.id" />
                                                                            <label class="custom-control-label" :for="`chk-${item.id}`">
                                                                                <span class="ms-2">{{ item.permission_display_name }}</span> 
                                                                            </label>
                                                                        </div>                                                                                         
                                                                    </div>
<!--                                                                </div>-->
                                                            </div>
<!--                                                        </perfect-scrollbar>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
<!--                        <div class="col-xl-6 col-lg-6 col-md-6 layout-spacing">
                            <div class="section service">
                                <div class="info">
                                    <h5 class="">Services</h5>
                                    <div class="row">
                                        <div class="col-md-12 mx-auto">
                                            <div class="row">
                                                <div class="col-md-12 mx-auto">
                                                    <div class="permission-container">
                                                        <div class="accordion permission-list">
                                                            <div class="search">
                                                                <input type="text" v-model.trim="search_service" class="input-search form-control" v-on:keyup="search_services()" placeholder="Search Here..." />
                                                            </div>

                                                            <div class="action-center">
                                                                <div class="checkbox-primary new-control custom-control custom-checkbox">
                                                                    <input id="chkALl-service" type="checkbox" :checked="check_all_service_checkbox" class="custom-control-input" @change="check_all_services($event.target.checked)" />
                                                                    <label class="custom-control-label" for="chkALl-service">
                                                                        <span class="ms-2">Check All</span>
                                                                    </label>
                                                                </div>

                                                            </div>

                                                            <div class="permission-box">
                                                                <div v-for="(item, index) in filtered_service_list" :key="item.id + '' + index" class="permission-item">
                                                                    <div class="animated fadeInUp">
                                                                        <div class="d-flex permission-item-inner">
                                                                            <div class="checkbox-primary custom-control custom-checkbox">
                                                                                <input type="checkbox" :id="`chk-service-${item.id}`" v-model="form.service_ids" class="custom-control-input" :value="item.id" />
                                                                                <label class="custom-control-label" :for="`chk-service-${item.id}`">
                                                                                    <span class="ms-2">{{ item.service_name }}</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
            <div class="role-footer">
                <div class="as-footer-container">
                    <router-link :to="{name: 'roles'}" class="btn btn-danger">
                        Cancel
                    </router-link>
                    <button v-if="loadingSubmitted" disabled type="button" class="btn btn-success">
                        <SvgIcon icon="feather-loader"></SvgIcon>
                        Saving...
                    </button>
                    <button v-else type="submit" class="btn btn-success">Save Changes</button>
                </div>
            </div>
        </form>
    </div>
    </div>
</template>
<style scoped>
    .layout-px-spacing {
        min-height: calc(100vh - 170px) !important;
    }
</style>

<script setup>
    import {onMounted, ref, computed} from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/users/role/role.scss';
    import { useMeta } from '@/composables/use-meta';
    import feather from 'feather-icons';
    import useShowMessage from "@/composables/useShowMessage";
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from "vue-router";
    import Loader from '@/views/backend/loader/default-loader';
    
    useMeta({ title: 'Add/Edit Permissions' });
    /* Import composable file */
    const { showMessage,showAlert } = useShowMessage();
    /* end */
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const filtered_permission_list = ref([]);
    let permission_list = ref([]);
    const search_permission = ref('');
    const role_data = ref([]);
    const form = ref({
        permissions:[],
        id: route.params.id ?? null,
    });

    /* set loader to state */
    const loading = computed(() => store.state.role.permissions.loading);
    const loadingSubmitted = computed(() =>  store.state.role.buttonLoading.loading);

    // computed
    const check_all_checkbox = computed(() => {
        if (filtered_permission_list.value.length && form.value.permissions.length == filtered_permission_list.value.length) {
            return true;
        } else {
            return false;
        }
    });

    onMounted(() => {
        feather.replace();
        getRoleData();
        getPermissions();
    })
    /* get role data */
    function getRoleData() {
        if(route.params.id){
            store.dispatch('role/getRole',route.params.id).then(() => {
                role_data.value = store.state.role.role.data;
                //console.log(route.params.id);
            });
        }        
    }
    /* get permissions data */
    function getPermissions() {
        store.dispatch('role/getPermissions').then(() => {
            permission_list.value = store.state.role.permissions.data;            
            search_permissions();
            getRolePermissions();
        });        
    }
    /* get role-permissions data */
    function getRolePermissions() {
        if(route.params.id){
            store.dispatch('role/getRolePermissions',route.params.id).then(() => {
                form.value.permissions = store.state.role.rolePermissions.data;
            });
        }
    }   

    const search_permissions = () => {
        filtered_permission_list.value = permission_list.value.filter(
            (d) =>
                (d.permission_display_name && d.permission_display_name.toLowerCase().includes(search_permission.value))
        );
    };
    /*const search_services = () => {
        filtered_service_list.value = service_list.value.filter(
            (d) =>
                (d.service_name && d.service_name.toLowerCase().includes(search_service.value))
        );
    };*/

    const check_all = (is_checked) => {
        if (is_checked) {
            form.value.permissions = filtered_permission_list.value.map((d) => {
                return d.id;
            });
        } else {
            clear_selection();
        }
    };

    const clear_selection = () => {
        form.value.permissions = [];        
    };

    /* Save/Update data to database */
    const submit_form = () => {
        store.dispatch('role/saveRolePermission',{...form.value}).then(({data}) => {
            store.commit('role/setButtonLoading', false);
            if(data.success === true){                
                showAlert(data.message,'success');// type => success/error
                router.push({name:'roles'})
            }else{
                showMessage(data.message,'error');// type => success/error
            }

        }).catch((err) => {
            store.commit('role/setButtonLoading', false);
            //error.value = `${err.data.message}`;
            showMessage('Something went really wrong!','error');// type => success/error
        });
        
    };
    
</script>

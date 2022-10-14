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
                            <li class="breadcrumb-item active" aria-current="page"><span>Add Role</span></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
    </teleport>
    <div class="layout-px-spacing">
        <div class="roles-container layout-top-spacing">
        <form @submit.prevent="submit_form">
            <div class="role-content">
                <div class="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <div class="section role-info">
                                <div class="info">
                                    <h5 class="">Role Information</h5>
                                    <div class="row">
                                        <div class="col-md-11 mx-auto">
                                            <div class="row">
                                                <!-- Name -->
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label id="role_name" for="role-name">Role Name</label>
                                                        <input ref="role_name" v-model="form.role_name" id="role-name" type="text" class="form-control" placeholder="Role Name *"
                                                               :class="[is_submit_form ? (form.role_name ? 'is-valid' : 'is-invalid') : '']" />
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please fill the role name</div>
                                                    </div>
                                                </div>
                                                <!--/ Name -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <div class="section permission">
                                <div class="info">
                                    <h5 class="">Permissions</h5>
                                    <div class="row">
                                        <div class="col-md-12 mx-auto">
                                            <div class="permission-container">
                                                <div class="accordion permission-list">
                                                    <div class="search">                                                                
                                                        <input type="text" v-model.trim="search_permission" class="input-search form-control" v-on:keyup="search_permissions()" placeholder="Search Here..." />
                                                    </div>

                                                    <div class="action-center">
                                                        <div class="checkbox-primary new-control custom-control custom-checkbox">
                                                            <input id="chkALl" type="checkbox" :checked="check_all_checkbox" class="custom-control-input" @change="check_all($event.target.checked)" />
                                                            <label class="custom-control-label" for="chkALl">
                                                                <span class="ms-2">Check All</span>
                                                            </label>
                                                        </div>
                                                        
                                                    </div>

                                                    <div class="permission-box">
<!--                                                        <perfect-scrollbar class="permission-box-scroll" id="ct">-->
                                                            <div v-for="(item, index) in filtered_permission_list" :key="item.id + '' + index" class="permission-item" >
                                                                <div class="animated fadeInUp">
                                                                    <div class="d-flex permission-item-inner">
                                                                        <div class="checkbox-primary custom-control custom-checkbox">
                                                                            <input type="checkbox" :id="`chk-${item.id}`" v-model="form.ids" class="custom-control-input" :value="item.id" />
                                                                            <label class="custom-control-label" :for="`chk-${item.id}`">
                                                                                <span class="ms-2">{{ item.permission }}</span> 
                                                                            </label>
                                                                        </div>                                                                                         
                                                                    </div>
                                                                </div>
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
<!--                    <button type="button" class="btn btn-danger" @click="cancel_form()">Cancel</button>-->
                    <button type="submit" class="btn btn-success">Save Changes</button>
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
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";
    useMeta({ title: 'Add Role' });
    /* Import composable file */
    const { validation, field_name } = useValidation();
    const { showMessage } = useShowMessage();
    /* end */

    const is_submit_form = ref(false);
    const filtered_permission_list = ref([]);
    let permission_list = ref([]);
    /*const filtered_service_list = ref([]);
    let service_list = ref([]);
    const search_service = ref('');*/
    const validateData = ref({role_name:''});
    const search_permission = ref('');
    const role_name = ref(null);
    const form = ref({
        role_name:'',
        ids:[],
    });

    // computed
    const check_all_checkbox = computed(() => {
        if (filtered_permission_list.value.length && form.value.ids.length == filtered_permission_list.value.length) {
            return true;
        } else {
            return false;
        }
    });
    /*const check_all_service_checkbox = computed(() => {
        if (filtered_service_list.value.length && form.value.service_ids.length == filtered_service_list.value.length) {
            return true;
        } else {
            return false;
        }
    });*/

    onMounted(() => {
        feather.replace();
        bind_permission();
        /*bind_service();*/
    })
    
    const bind_permission = () => {
        permission_list.value = [
            {id: 1, permission:'country-add'},
            {id: 2, permission:'country-edit'},
            {id: 3, permission:'country-view'},
            {id: 4, permission:'country-delete'},
            {id: 5, permission:'province-add'},
            {id: 6, permission:'province-edit'},
            {id: 7, permission:'province-view'},
            {id: 8, permission:'province-delete'},
            {id: 9, permission:'city-add'},
            {id: 10, permission:'city-edit'},
            {id: 11, permission:'city-view'},
            {id: 12, permission:'city-delete'},
        ]
        search_permissions();
    }
    /*const bind_service = () => {
        service_list.value = [
            {id: 1, service_name:'Service name 1'},
            {id: 2, service_name:'Service name 2'},
            {id: 3, service_name:'Service name 3'},
            {id: 4, service_name:'Service name 4'},
            {id: 5, service_name:'Service name 5'},
            {id: 6, service_name:'Service name 6'},
            {id: 7, service_name:'Service name 7'},
            {id: 8, service_name:'Service name 8'},
        ]
        search_services();
    }*/

    const search_permissions = () => {        
        filtered_permission_list.value = permission_list.value.filter(
            (d) =>
                (d.permission && d.permission.toLowerCase().includes(search_permission.value))
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
            form.value.ids = filtered_permission_list.value.map((d) => {
                return d.id;
            });
        } else {
            clear_selection(1);
        }
    };
    /*const check_all_services = (is_checked) => {
        if (is_checked) {
            form.value.service_ids = filtered_service_list.value.map((d) => {
                return d.id;
            });
        } else {
            clear_selection(0);
        }
    };*/

    const clear_selection = (flag) => {
        form.value.ids = [];
        /*if(flag){
        }else{
            form.value.service_ids = [];
        }*/
    };

    // Save/Update data to database
    const submit_form = () => {
        is_submit_form.value = true;
        validateData.value.role_name = form.value.role_name;
        if (validation(validateData)) {
            console.log(form.value);
            //form validated success
            showMessage('Form submitted successfully.','success');// type => success/error
        }else {
            eval(field_name.value[0]).value.focus();
            showMessage('Role is required.', 'error');// type => success/error
        }
    };
    
</script>

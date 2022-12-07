<template>
    <div class="layout-px-spacing">
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
                                <li class="breadcrumb-item"><a href="javascript:;">Role Manage</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Roles</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>
<!--        <Loader v-if="loading"></Loader>-->
        <div class="row layout-top-spacing">
            <div class="col-12 layout-spacing">
                <div class="panel br-6">
                    <div class="custom-table panel-body p-0">
                        <div class="d-flex flex-wrap justify-content-between px-3 pt-3 pb-0">
                            <div>
                                <a id="addRole" href="javascript:;" @click="handle_edit()" class="btn me-2 btn-primary">
                                    <i data-feather="plus"></i>
                                    Add New
                                </a>
                            </div>
                            <div>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('csv')">CSV</button>
                                <vue3-json-excel class="btn btn-primary m-1" name="roles.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        <div class="vl-parent">
                            <Loading :active="isLoading"
                                     :can-cancel="loadingOption.canCancel"
                                     :color="loadingOption.color"
                                     :loader="loadingOption.loader"
                                     :width="loadingOption.width"
                                     :height="loadingOption.height"
                                     :backgroundColor="loadingOption.backgroundColor"
                                     :opacity="loadingOption.opacity"
                                     :is-full-page="loadingOption.fullPage" />
                            
                        <v-client-table :data="items" :columns="columns" :options="table_option">
                            
                            <template #actions="props">
                                <a href="javascript:void(0);" title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="eye"></SvgIcon>                                   
                                </a>
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="edit-2"></SvgIcon>                                       
                                </a>
                                <a href="javascript:void(0);" @click="handle_delete(props.row.id)" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="trash"></SvgIcon>                                    
                                </a>
                            </template>                            
                            <template #permission="props">
                                <router-link :to="{name: 'role-permission',params:{id: props.row.id}}" class="btn me-2 btn-success">
                                    <SvgIcon icon="edit"></SvgIcon>
                                    Permissions
                                </router-link>
                            </template>
<!--                            <template #service="props">
                                <a href="javascript:" class="btn me-2 btn-success" @click="getService(props.row)">
                                    <SvgIcon icon="edit"></SvgIcon>
                                    Services
                                </a>
                            </template>-->
                        </v-client-table>
                         </div>   
                    </div>
                </div>
            </div>
            <!--Add Role Modal-->
            <div id="addRoleModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update Role' : 'Add New Role' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <TInput
                                                        id="name"
                                                        label="Role Name"
                                                        placeholder="Role Name *"
                                                        ref="role_name"
                                                        label-id="role_name"
                                                        type="text"
                                                        :required-field="true"
                                                        v-model="params.name"
                                                        :is-submit-form="is_submit_form"
                                                    />                                                    
                                                </div>
                                            </div>
                                            <!-- Status -->
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <BaseSelect
                                                        id="role_status"
                                                        label="Status"
                                                        :required-field="false"
                                                        v-model="params.role_status"
                                                        :options="activeOptions"
                                                    />
                                                </div>
                                            </div>
                                            <!--/ Status -->
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <TInput
                                                        id="role_remark"
                                                        label="Remarks"
                                                        placeholder="Remarks"
                                                        type="text"
                                                        :required-field="false"
                                                        v-model="params.role_remark"
                                                    />                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal" @click="reset_form()">Discard</button>
                            <button v-if="loadingSubmitted" disabled type="button" class="btn btn-success">
                                <SvgIcon icon="feather-loader"></SvgIcon>
                                Saving...
                            </button>
                            <button v-else type="submit" class="btn btn-success" @click="handle_save()">{{ params.id ? 'Update' : 'Add' }}</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--/ Add Role Modal-->

            <!--Delete Modal-->
            <DeleteModal
                modal-id="deleteModal"
                :delete-params="deleteParams"
                :loading-submitted="loadingSubmitted"
                ref="pin"
                @deleteSubmit="delete_submit()"
                @resetForm="reset_delete_form()"
            />
            <!--/ Delete Modal-->
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
    import feather from 'feather-icons';
    import useShowMessage from "@/composables/useShowMessage";
    import useExportTable from "@/composables/useExportTable";
    import useValidation from "@/composables/useValidation";
    import { useMeta } from '@/composables/use-meta';
    import TInput from '@/components/form/core/BaseInput.vue';
    import BaseSelect from '@/components/form/core/BaseSelect.vue';
    import DeleteModal from '@/components/form/DeleteModal.vue';
    import { useStore } from 'vuex';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';
    //import Loader from '@/views/backend/loader/default-loader';

    /* Set page title */
    useMeta({ title: 'Roles' });
    
    /* variable declaration */
    const { validation } = useValidation();
    const { showMessage, showAlert } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const is_submit_form = ref(false);
    const pin = ref(null);
    let addRoleModal = ref(null);
    let deleteModal = ref(null);
    const validateData = ref({ name:''});
    const params = ref({
        name: '',
        id:null,
        guard_name: 'web',
        role_status:'ACTIVE',
        role_remark:'',
    });
    const deleteParams = ref({
        role_id: null,
        pin: '',
    });
    const activeOptions = ref(store.state.constant.activeStatus);
    const columns = ref(['id', 'name', 'permission','role_status','role_remark', 'actions']);
    const items = ref([]);

    /* Set Data table option */
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { action: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        sortable: ['id', 'name'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
    });

    /* set loader to state */
    const loadingOption = ref({
        fullPage: false,
        canCancel: false, // default false
        onCancel: null,
        color: '#007BFF',
        loader: 'dots',
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        opacity: 0.5,
        zIndex: 999,
    })
    const isLoading = computed(() => store.state.role.roles.loading);
    const loadingSubmitted = computed(() =>  store.state.role.buttonLoading.loading);    

    /* Mounted hook */
    onMounted(() => {
        getRoleData();
        feather.replace();
    });
    
    /* get role data */
    function getRoleData() {
        store.dispatch('role/getRoles').then(() => {
            //console.log(store.state.role.roles.data.roles);
            items.value = store.state.role.roles.data;
            initPopup();
            initDeletePopup();
        });
    }

    /* Add Role Modal init */
    const initPopup = () => {
        addRoleModal = new window.bootstrap.Modal(document.getElementById('addRoleModal'));
    };
    /* Delete Modal init */
    const initDeletePopup = () => {
        deleteModal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    };

    /* open modal in add and edit mode */
    const handle_edit = (role) => {
        if (role) {
            reset_form();
            params.value = JSON.parse(JSON.stringify(role));
        }
        addRoleModal.show();
    };
    
    /* Save and update state */
    function handle_save(){
        is_submit_form.value = true;
        validateData.value.name = params.value.name;
        if (validation(validateData)) {
            let dispatchUral = 'role/saveRole';
            if(params.value.id){
                dispatchUral = 'role/updateRole';
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                store.commit('role/setButtonLoading', false);
                if(data.data.status === true){
                    const currentData = store.state.role.role.data;
                    if(params.value.id){
                        items.value[items.value.findIndex((d) => d.id === params.value.id)] = currentData;
                    }else {
                        items.value.splice(0,0,currentData);
                    }
                    showAlert(data.message,'success');// type => success/error
                    reset_form();
                    addRoleModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }             
                
            }).catch((err) => {
                store.commit('role/setButtonLoading', false);
                //error.value = `${err.data.message}`;
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            showMessage('Field Validation Error!','error');// type => success/error
        }
    }

    /* Delete role */
    function handle_delete(id) {
        reset_delete_form();
        deleteParams.value.role_id = id;
        deleteModal.show();
    }
    
    function delete_submit(){
        if(deleteParams.value.pin){
            store.dispatch("role/deleteRole",{...deleteParams.value}).then(({data}) => {
                //console.log(data.data.status);
                store.commit('role/setButtonLoading', false);
                if(data.data.status === true){
                    items.value = items.value.filter((d) => d.id !== deleteParams.value.role_id);
                    showAlert(data.message,'success');// type => success/error
                    reset_delete_form();
                    deleteModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }

            }).catch((err) => {
                store.commit('role/setButtonLoading', false);
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            eval(pin).value?.focus();
        }
            
    }

    /* Add or Edit Permission */
    const getPermission = (id) => {
        
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value = {id:null,name:'',guard_name: 'web',role_remark:'',role_status:'ACTIVE'};
        is_submit_form.value = false;
    };

    /* Reset all reactive/ref filed after successful insert */
    const reset_delete_form = () => {
        deleteParams.value.role_id = null;
        deleteParams.value.pin = '';
    };

    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'permission' && d != 'actions');
        exportTable(type,items.value,cols,'Roles');    
    };

    /* define excel column */
    const excel_columns = () => {
        return {
            'Role ID': 'id',
            'Role Name': 'name',        
            'Role Remark': 'role_remark',        
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

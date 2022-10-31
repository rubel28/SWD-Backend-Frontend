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
                                <li class="breadcrumb-item active" aria-current="page"><span>Permissions</span></li>
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
                                <vue3-json-excel class="btn btn-primary m-1" name="permissions.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>

                        <v-server-table ref="table" :columns="columns" :options="table_option">
                            
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
                        </v-server-table>
                    </div>
                </div>
            </div>
            <!--Add Role Modal-->
            <div id="addPermissionModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update Permission' : 'Add New Permission' }}</h5>
<!--                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>-->
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <TInput
                                                    id="name"
                                                    label="Permission Name"
                                                    placeholder="Permission Name *"
                                                    ref="name"
                                                    label-id="permission-name"
                                                    type="text"
                                                    :required-field="true"
                                                    v-model="params.name"
                                                    :is-submit-form="is_submit_form"
                                                />                                                    
                                            </div>
                                            <!-- Status -->
                                            <div class="col-md-6">
                                                <BaseSelect
                                                    id="role_status"
                                                    label="Status"
                                                    :required-field="false"
                                                    v-model="params.permission_status"
                                                    :options="activeOptions"
                                                />
                                            </div>
                                            <!--/ Status -->
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <TInput
                                                        id="display_name"
                                                        label="Display Name"
                                                        placeholder="Display Name *"
                                                        type="text"
                                                        :required-field="true"
                                                        v-model="params.permission_display_name"
                                                        :is-submit-form="is_submit_form"
                                                    />                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <TInput
                                                        id="permission_remark"
                                                        label="Remarks"
                                                        placeholder="Remarks"
                                                        type="text"
                                                        :required-field="false"
                                                        v-model="params.permission_remark"
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
    import Loader from '@/views/backend/loader/default-loader';
    import axiosClient from "@/axios";

    /* Set page title */
    useMeta({ title: 'Permissions' });
    
    /* variable declaration */
    const { validation } = useValidation();
    const { showMessage, showAlert } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const is_submit_form = ref(false);
    let addPermissionModal = ref(null);
    const table = ref(null);
    const pin = ref(null);
    let deleteModal = ref(null);
    const validateData = ref({ name:'',permission_display_name:''});
    const params = ref({
        name: '',
        id:null,
        guard_name: 'web',
        permission_status:'ACTIVE',
        permission_display_name:'',
        permission_remark:'',
    });
    const deleteParams = ref({
        permission_id: null,
        pin: '',
    });
    const activeOptions = ref(store.state.constant.activeStatus);
    const columns = ref(['id', 'name', 'permission_display_name','permission_status','permission_remark', 'actions']);
    const items = ref([]);

    /* Set Data table option */
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { actions: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 3,edge: true,dropdown: false },
        debounce: 500,
        filterByColumn:false,
        filterable:true,
        orderBy:{column:'name',ascending:true},
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
            loadingError: 'Oops! Something went wrong',
        },
        sortable: ['id', 'name', 'permission_display_name','permission_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        requestFunction(data) {
            return axiosClient.get('/permissions', {
                params: data
            }).catch(function (e) {
                this.dispatch('error',e);
            })
        },
        requestAdapter(data) {
            return {
                search_text: data.query,
                display_item_per_page: data.limit,
                page: data.page,
                orderBy: data.orderBy,
                ascending: data.ascending,
                byColumn: data.byColumn,
            }
        },
        responseAdapter({data}) {
            //console.log(data.data.countries);
            items.value = data.data.permissions;
            return {
                data: data.data.permissions,
                count: data.data.total,
            }
        },
    });

    /* set loader to state */
    //const loading = computed(() => store.state.permission.permissions.loading);
    const loadingSubmitted = computed(() =>  store.state.permission.buttonLoading.loading);    

    /* Mounted hook */
    onMounted(() => {
        //getPermissionData();
        feather.replace();
        initPopup();
        initDeletePopup();
    });
    
    /* get role data */
    /*function getPermissionData() {
        store.dispatch('permission/getPermissions').then(() => {
            //console.log(store.state.role.roles.data.roles);
            items.value = store.state.permission.permissions.data.permissions;
            initPopup();
            initDeletePopup();
        });
    }*/

    /* Add Role Modal init */
    const initPopup = () => {
        addPermissionModal = new window.bootstrap.Modal(document.getElementById('addPermissionModal'));
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
        addPermissionModal.show();
    };
    
    /* Save and update state */
    function handle_save(){
        is_submit_form.value = true;
        validateData.value.name = params.value.name;
        validateData.value.permission_display_name = params.value.permission_display_name;
        if (validation(validateData)) {
            let dispatchUral = 'permission/savePermission';
            if(params.value.id){
                dispatchUral = 'permission/updatePermission';
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                store.commit('permission/setButtonLoading', false);
                if(data.data.status === true){
                    const currentData = store.state.permission.permission.data;
                    if(params.value.id){
                        table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                    }else {
                        table.value.data.splice(0,0,currentData);
                    }
                    showAlert(data.message,'success');// type => success/error
                    reset_form();
                    addPermissionModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }             
                
            }).catch((err) => {
                store.commit('permission/setButtonLoading', false);
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
        deleteParams.value.permission_id = id;
        deleteModal.show();
    }
    
    function delete_submit(){
        if(deleteParams.value.pin){
            store.dispatch("permission/deletePermission",{...deleteParams.value}).then(({data}) => {
                //console.log(data.data.status);
                store.commit('permission/setButtonLoading', false);
                if(data.data.status === true){
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === deleteParams.value.permission_id),1);
                    showAlert(data.message,'success');// type => success/error
                    reset_delete_form();
                    deleteModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }

            }).catch((err) => {
                store.commit('permission/setButtonLoading', false);
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            eval(pin).value?.focus();
        }
            
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value = {id:null,name:'',guard_name: 'web',permission_remark:'',permission_status:'ACTIVE'};
        is_submit_form.value = false;
    };

    /* Reset all reactive/ref filed */
    const reset_delete_form = () => {
        deleteParams.value.permission_id = null;
        deleteParams.value.pin = '';
    };

    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'actions');
        exportTable(type,items.value,cols,'Permissions');    
    };

    /* define excel column */
    const excel_columns = () => {
        return {
            'Permission ID': 'id',
            'Permission Name': 'name',        
            'Display Name': 'permission_display_name',        
            'Permission Remark': 'permission_remark',        
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

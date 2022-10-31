<template>
    <teleport to="#breadcrumb">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="javascript:">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-home"
                                    >
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                </a>
                            </li>
                            <li class="breadcrumb-item"><a href="javascript:;">Utility Settings</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><span>State</span></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
    </teleport>
<!--    <Loader v-if="loading=false"></Loader>-->
    <div class="layout-px-spacing">
        <div class="row layout-top-spacing">
            <div v-if="error" class="alert alert-light-danger alert-dismissible border-0 mb-4" role="alert">
                <strong>{{ error }}</strong>
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">×</button>
            </div>
            <div class="col-12 layout-spacing">
                <div class="panel br-6">
                    <div class="custom-table panel-body p-0">
                        <div class="d-flex flex-wrap justify-content-between px-3 pt-3 pb-0">
                            <div>
                                <a id="addCountry" href="javascript:;" @click="handle_edit()" class="btn me-2 btn-primary">
                                    <SvgIcon icon="plus"></SvgIcon>                                    
                                    Add New
                                </a>
                            </div>
                            <div>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('csv')">CSV</button>
                                <vue3-json-excel class="btn btn-primary m-1" name="state.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        

                        <v-server-table ref="table" :columns="columns" :options="table_option"
                                        @loading="loading=true"
                                        @loaded="loading=false">

                            <template #actions="props">
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="edit-2"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" @click="handle_delete(props.row.id)" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="trash"></SvgIcon>
                                </a>
                            </template>                            
                            <template #id="props">{{ props.row.id }}</template>
                            <template #province_name="props">{{ props.row.state_name }}</template>
                            <template #country_name="props">{{ props.row.country_code }}</template>
                            <template #active_status="props">{{ props.row.state_status }}</template>
                        </v-server-table>
                    </div>
                </div>                
            </div>
            <!-- State Add Modal-->
            <div id="addStateModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update State' : 'Add New State' }}</h5>
<!--                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>-->
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <TInput
                                                    id="name"
                                                    label="State Name"
                                                    placeholder="State Name *"
                                                    ref="state_name"
                                                    label-id="state_name"
                                                    type="text"
                                                    :maxlength="255"
                                                    :required-field="true"
                                                    v-model="params.state_name"
                                                    :is-submit-form="is_submit_form"
                                                />                                                
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <TInput
                                                    id="state-latitude"
                                                    label="State latitude"
                                                    placeholder="State latitude *"
                                                    ref="state_latitude"
                                                    label-id="state_latitude"
                                                    type="text"
                                                    :maxlength="255"
                                                    :required-field="true"
                                                    v-model="params.state_latitude"
                                                    :is-submit-form="is_submit_form"
                                                />
                                            </div>
                                            <div class="col-md-6">
                                                <TInput
                                                    id="state-longitude"
                                                    label="State longitude"
                                                    placeholder="State longitude *"
                                                    ref="state_longitude"
                                                    label-id="state_longitude"
                                                    type="text"
                                                    :maxlength="255"
                                                    :required-field="true"
                                                    v-model="params.state_longitude"
                                                    :is-submit-form="is_submit_form"
                                                />
                                            </div>
                                        </div>
                                        <div class="row">                                            
                                            <div class="col-md-6">
                                                <BaseSelect
                                                    id="country-name"
                                                    label="Country Name"
                                                    ref="country_name"
                                                    label-id="country_name"
                                                    :required-field="true"
                                                    v-model="params.country_id"
                                                    :options="options"
                                                    :is-submit-form="is_submit_form"
                                                />
                                            </div>
                                            <div class="col-md-6">
                                                <BaseSelect
                                                    id="status"
                                                    label="Status"
                                                    :required-field="false"
                                                    v-model="params.state_status"
                                                    :options="activeOptions"
                                                />
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
            <!--/ Add State Modal-->

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
<style>
.VueTables__error {
    color:red;
}
</style>

<script setup>
    import {computed, onMounted, ref} from 'vue';
    import '@/assets/sass/components/custom-sweetalert.scss';
    import '@/assets/sass/province/province.scss';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";    
    import useExportTable from "@/composables/useExportTable";
    import TInput from '@/components/form/core/BaseInput.vue';
    import BaseSelect from '@/components/form/core/BaseSelect.vue';
    import DeleteModal from '@/components/form/DeleteModal.vue';
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    import axiosClient from "@/axios";
    
    /* Set page title */
    useMeta({ title: 'State' });
    
    /* variable declaration */
    const { validation } = useValidation();
    const { showMessage,showAlert } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    const activeOptions = ref(store.state.constant.activeStatus);
    const is_submit_form = ref(false);
    let addStateModal = ref(null);
    let deleteModal = ref(null);
    const pin = ref(null);
    const params = ref({
        state_name: '',
        state_status: 'ACTIVE',
        id:null,
        country_id:'',
        state_latitude:'',
        state_longitude:'',
    });
    const deleteParams = ref({
        state_id: null,
        pin: '',
    });
    const options = ref([]);
    const table = ref(null);
    const validateData = ref({ province_name:'',country_id:'',state_latitude:'',state_longitude:''});
    const columns = ref(['id','state_name', 'country_name', 'state_status', 'actions']);
    const items = ref([]);

    /* Set Data table option */
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { action: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 3,edge: true,dropdown: false },
        debounce: 500,
        filterByColumn:false,
        filterable:true,
        orderBy:{column:'states.id',ascending:true},
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
            loadingError: 'Oops! Something went wrong',
        },
        sortable: ['id','state_name','country_name','state_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        requestFunction(data) {
            return axiosClient.get('/states', {
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
                orderBy: data.orderBy == 'id'? 'states.id':data.orderBy,
                ascending: data.ascending,
                byColumn: data.byColumn,                
            }
        },
        responseAdapter({data}) {
            items.value = data.data.states;
            return {
                data: data.data.states,
                count: data.data.total,
            }
        },
    });

    /* set state data and loader to state */
    //const loading = computed(() => store.state.state.country.loading);
    const loadingSubmitted = computed(() =>  store.state.state.buttonLoading.loading);

    /* Mounted hook */
    onMounted(() => {
        getCountryData();        
    })
    
    /* get state data */
    /*function getStateData() {        
        store.dispatch('state/getStates').then(() => {
            items.value = store.state.state.states.data;
            initPopup();
        });
    }*/
    /* get country data */
    function getCountryData() {
        store.dispatch('country/getAllCountries').then(() => {
            options.value = store.state.country.allCountry.data.reduce((accumulator, item) => {
                return {...accumulator, [item.id]: item.country_name};
            },{});
            initPopup();
            initDeletePopup();
            //console.log(options.value);
        });
    }

    /* Modal init */
    const initPopup = () => {
        addStateModal = new window.bootstrap.Modal(document.getElementById('addStateModal'));
    };

    /* Delete Modal init */
    const initDeletePopup = () => {
        deleteModal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    };

    /* open modal in add and edit mode */
    const handle_edit = (state) => {        
        if (state) {
            reset_form();
            //params.value = JSON.parse(JSON.stringify(state));
            params.value.state_name = state.state_name;
            params.value.id = state.id;
            params.value.country_id = state.country_id;
            params.value.state_latitude = state.state_latitude;
            params.value.state_longitude = state.state_longitude;
            params.value.state_status = state.state_status;
        }
        //console.log(params.value);
        addStateModal.show();
    };
    /* Save and update state */
    function handle_save(){
        is_submit_form.value = true;
        validateData.value.province_name = params.value.state_name;
        validateData.value.country_id = params.value.country_id;
        validateData.value.state_latitude = params.value.state_latitude;
        validateData.value.state_longitude = params.value.state_longitude;
        if (validation(validateData)) {
            let dispatchUral = 'state/saveState';
            if(params.value.id){
                dispatchUral = 'state/updateState';
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('state/setButtonLoading', false);
                if(data.data.status === true){
                    const currentData = store.state.state.state.data;
                    if(params.value.id){
                        table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                    }else {
                        table.value.data.splice(0,0,currentData);
                    }
                    showAlert(data.message,'success');// type => success/error
                    reset_form();
                    addStateModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }
                
            }).catch((err) => {
                store.commit('state/setButtonLoading', false);
                //error.value = `${err.data.message}`;
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            //showMessage('Field Validation Error!','error');// type => success/error
        }
    }

    /* Delete state */
    function handle_delete(id) {
        reset_delete_form();
        deleteParams.value.state_id = id;
        deleteModal.show();
    }

    function delete_submit(){
        if(deleteParams.value.pin){
            store.dispatch("state/deleteState",{...deleteParams.value}).then(({data}) => {
                //console.log(data.data.status);
                store.commit('state/setButtonLoading', false);
                if(data.data.status === true){
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === deleteParams.value.state_id),1);
                    showAlert(data.message,'success');// type => success/error
                    reset_delete_form();
                    deleteModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }

            }).catch((err) => {
                store.commit('state/setButtonLoading', false);
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            eval(pin).value?.focus();
        }

    }    

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value = {id:null,state_name:'',state_status: 'ACTIVE',country_id:'',state_latitude:'',state_longitude:''};
        is_submit_form.value = false;
    };

    /* Reset all reactive/ref filed */
    const reset_delete_form = () => {
        deleteParams.value.state_id = null;
        deleteParams.value.pin = '';
    };
    
    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'actions');
        exportTable(type,items.value,cols,'State');
    }
    
    /* define excel column */
    const excel_columns = () => {
        return {
            'ID': 'id',
            'Name': 'state_name',
            'Country Name': 'country_code',
            'State latitude': 'state_latitude',
            'State longitude': 'state_longitude',
            Status: 'state_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

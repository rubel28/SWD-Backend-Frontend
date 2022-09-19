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
                            <li class="breadcrumb-item active" aria-current="page"><span>Province</span></li>
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
                                <a id="addCountry" href="javascript:;" @click="handle_edit()" class="btn me-2 btn-primary"
                                ><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-plus"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                    Add New
                                </a>
                            </div>
                            <div>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('csv')">CSV</button>
                                <vue3-json-excel class="btn btn-primary m-1" name="province.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        

                        <v-server-table ref="table" :columns="columns" :options="table_option"
                                        @loading="loading=true"
                                        @loaded="loading=false">

                            <template #action="props">
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-edit-2"
                                    >
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                </a>
                                <a href="javascript:void(0);" @click="handle_delete(props.row.id)" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-trash"
                                    >
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </a>
                            </template>                            
                            <template #id="props">{{ props.row.id }}</template>
                            <template #province_name="props">{{ props.row.province_name }}</template>
                            <template #country_name="props">{{ props.row.country_name }}</template>
                            <template #active_status="props">{{ props.row.active_status }}</template>
                        </v-server-table>
                    </div>
                </div>                
            </div>
            <!--Modal-->
            <div id="addProvinceModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update Province' : 'Add New Province' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="name"><strong>Province Name</strong></label>
                                                    <input v-model="params.province_name"
                                                           id="name" type="text"
                                                           name="province_name"
                                                           class="form-control"
                                                           placeholder="Province Name"
                                                           ref="province_name"
                                                           :class="[is_submit_form ? (params.province_name ? 'is-valid' : 'is-invalid') : '']"
                                                    />
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please fill the Province Name</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">                                            
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="country_name">Country Name</label>
                                                    <select v-model="params.country_id" class="form-select" id="country_name"
                                                            :class="[is_submit_form ? (params.country_id ? 'is-valid' : 'is-invalid') : '']">
                                                        <option value="" disabled>Select Country</option>
                                                        <option v-for="(option, i) in options" :key="option.id" :value="option.id">
                                                            {{option.country_name}}
                                                        </option>
                                                    </select>
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please Select Country</div>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="row">                                            
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="province_status">Active Status</label>
                                                    <div id="province_status" class="col-lg-3 col-md-3 col-sm-4 col-6">
                                                        <label class="switch s-outline s-outline-success mb-4 me-2">
                                                            <input
                                                                v-model="params.province_status"
                                                                type="checkbox"
                                                                name="province_status"
                                                            />
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </div>
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
                                    class="feather feather-loader spin me-2"
                                >
                                    <line x1="12" y1="2" x2="12" y2="6"></line>
                                    <line x1="12" y1="18" x2="12" y2="22"></line>
                                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                    <line x1="2" y1="12" x2="6" y2="12"></line>
                                    <line x1="18" y1="12" x2="22" y2="12"></line>
                                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                </svg>
                                Saving...
                            </button>
                            <button v-else type="submit" class="btn btn-success" @click="handle_save()">{{ params.id ? 'Update' : 'Add' }}</button>
                        </div>
                    </div>
                </div>
            </div>
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
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    import axiosClient from "@/axios";
    
    /* Set page title */
    useMeta({ title: 'Province' });
    
    /* variable declaration */
    const { validation,is_submit_form } = useValidation();
    const { showMessage } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    let addProvinceModal = ref(null);
    const params = ref({
        province_name: '',
        province_status: true,
        id:null,
        country_id:''
    });
    const options = ref([]);
    const table = ref(null)
    const validateData = ref({ province_name:'',country_id:'' });
    const columns = ref(['id','province_name', 'country_name', 'active_status', 'action']);
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
        orderBy:{column:'country_name',ascending:true},
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
            loadingError: 'Oops! Something went wrong',
        },
        sortable: ['id','province_name','country_name','active_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        requestFunction(data) {
            return axiosClient.get('/provinces', {
                params: data
            }).catch(function (e) {
                this.dispatch('error',e);
            })
        },
        requestAdapter(data) {
            return {
                sort: data.orderBy ? data.orderBy : 'country_name',
                direction: data.ascending ? 'asc' : 'desc',
                query: data.query,
                byColumn: data.byColumn,
                limit: data.limit,
                page: data.page,
                orderBy: data.orderBy,
                ascending: data.ascending,                
            }
        },
        responseAdapter({data}) {
            items.value = data.data;
            return {
                data: data.data,
                count: data.count,
            }
        },
    });

    /* set province data and loader to state */
    //const loading = computed(() => store.state.province.country.loading);
    const loadingSubmitted = computed(() =>  store.state.province.buttonLoading.loading);

    /* Mounted hook */
    onMounted(() => {
        //getProvinceData();
        getCountryData();
    })
    
    /* get province data */
    function getProvinceData() {        
        store.dispatch('province/getProvinces').then(() => {
            items.value = store.state.province.provinces.data;
            initPopup();
        });
    };
    /* get country data */
    function getCountryData() {
        store.dispatch('province/getCountries').then(() => {
            options.value = store.state.province.country.data;            
            initPopup();
        });
    };

    /* Modal init */
    const initPopup = () => {
        addProvinceModal = new window.bootstrap.Modal(document.getElementById('addProvinceModal'));
    };   

    /* open modal in add and edit mode */
    const handle_edit = (province) => {        
        if (province) {
            reset_form();
            params.value = JSON.parse(JSON.stringify(province));            
        }
        addProvinceModal.show();
    };
    /* Save and update province */
    function handle_save(){
        is_submit_form.value = true;
        validateData.value.province_name = params.value.province_name;
        validateData.value.country_id = params.value.country_id;
        if (validation(validateData)) {
            let dispatchUral = '';
            if(params.value.id){
                dispatchUral = 'province/updateProvince';
            }else{
                dispatchUral = 'province/saveProvince';                
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('province/setButtonLoading', false);
                const currentData = store.state.province.province.data;
                if(params.value.id){
                    table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                }else {
                    table.value.data.splice(0,0,currentData);
                }
                reset_form();
                showMessage(data.message,'success');// type => success/error
                addProvinceModal.hide();
            }).catch((err) => {
                store.commit('province/setButtonLoading', false);
                //error.value = `${err.data.message}`;
                showMessage(`${err.data.message}`,'error');// type => success/error
                addProvinceModal.hide();
            });
        }else {
            showMessage('Field Validation Error!','error');// type => success/error
        }
    }

    /* Delete province */
    function handle_delete(id) {
        new window.Swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em'
        }).then(result => {
            console.log(id);
            if (result.value) {
                store.dispatch("province/deleteProvince", id).then(() => {
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === id),1);                    
                });
                showMessage('Province has been deleted.','success');// type => success/error
            }
        });
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value = {id:null,province_name:'',province_status: true,country_id:''};
        is_submit_form.value = false;
    };
    
    /* Export table function */
    const export_table = (type) => {
        exportTable(type,items.value,columns.value);
    }
    /* define excel column */
    const excel_columns = () => {
        return {
            'ID': 'id',
            'Name': 'province_name',
            'Country Name': 'country_name',
            Status: 'active_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

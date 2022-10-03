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
                            <li class="breadcrumb-item active" aria-current="page"><span>City</span></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
    </teleport>
    <Loader v-if="loading"></Loader>
    <div v-else class="layout-px-spacing">
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
                                <vue3-json-excel class="btn btn-primary m-1" name="city.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        

                        <v-server-table ref="table" :columns="columns" :options="table_option">

                            <template #actions="props">
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
                            <template #city_name="props">{{ props.row.city_name }}</template>
                            <template #active_status="props">{{ props.row.active_status }}</template>
                            <template #country_name="props">{{ props.row.country_name }}</template>
                            <template #province_name="props">{{ props.row.province_name }}</template>
                        </v-server-table>
                    </div>
                </div>                
            </div>
            <!--Modal-->
            <div id="addCityModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update City' : 'Add New City' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="name"><strong>City Name</strong></label>
                                                    <input v-model="params.city_name"
                                                           id="name" type="text"
                                                           name="city_name"
                                                           class="form-control"
                                                           placeholder="City Name *"
                                                           ref="city_name"
                                                           :class="[is_submit_form ? (params.city_name ? 'is-valid' : 'is-invalid') : '']"
                                                    />
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please fill the City Name</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">                                            
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="country_name">Country Name</label>
                                                    <select v-model="params.country_id" @change="change_handle()" class="form-select" id="country_name"
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
                                                    <label for="province_name">Province Name</label>
                                                    <select v-model="params.province_id" class="form-select" id="province_name"
                                                            :class="[is_submit_form ? (params.province_id ? 'is-valid' : 'is-invalid') : '']">
                                                        <option value="" disabled>Select Province</option>
                                                        <option v-for="(option, i) in provinceOptions" :key="option.id" :value="option.id">
                                                            {{option.province_name}}
                                                        </option>
                                                    </select>
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please Select Province</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">                                            
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="city_status">Active Status</label>
                                                    <div id="city_status" class="col-lg-3 col-md-3 col-sm-4 col-6">
                                                        <label class="switch s-outline s-outline-success mb-4 me-2">
                                                            <input
                                                                v-model="params.city_status"
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
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import Loader from '@/views/backend/loader/default-loader';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";    
    import useExportTable from "@/composables/useExportTable";    
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    import axiosClient from '@/axios'
    
    /* Set page title */
    useMeta({ title: 'Province' });
    
    /* variable declaration */
    const { validation,is_submit_form } = useValidation();
    const { showMessage } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    let addCityModal = ref(null);
    const params = ref({
        city_name: '',
        city_status: true,
        id:null,
        province_id: '',
        country_id: '',
    });
    const table = ref(null);
    const options = ref([]);
    const provinceOptions = ref([]);
    //const province_name = ref(null);
    const validateData = ref({ city_name:'',country_id:'',province_id:'' });
    const columns = ref(['id','city_name','province_name','country_name', 'active_status', 'actions']);
    const items = ref([]);
    //const tableData = ref([]);

    /* Set Data table option */
    const table_option = ref({        
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { action: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 3,edge: true,dropdown: false },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        sortable: ['id','city_name','city_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        requestFunction(data) {
            return axiosClient.get('/cities', { 
                params: data
            }).catch(function (e) {
                this.dispatch('error',e);
            })
        },
        requestAdapter(data) {
            return {
                sort: data.orderBy ? data.orderBy : 'city_name',
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

    /* set city data and loader to state */
    const loading = computed(() => store.state.city.country.loading);
    const loadingSubmitted = computed(() =>  store.state.city.buttonLoading.loading);
    //const url = computed(() =>  `${store.getters.baseUrl}/cities`);
    //console.log(url);
    
    /* Mounted hook */
    onMounted(() => {
        getCountryData();
    })
    
    /* get province data */
    function getProvinceData() {        
        store.dispatch('city/getProvinces',params.value.country_id).then(() => {
            provinceOptions.value = store.state.city.provinces.data;
        });
    };
    /* get country data */
    function getCountryData() {
        store.dispatch('city/getCountries').then(() => {
            options.value = store.state.city.country.data;
            initPopup();
        });
    };

    function change_handle(){
        getProvinceData();
        params.value.province_id = '';
    }

    /* Modal init */
    const initPopup = () => {
        addCityModal = new window.bootstrap.Modal(document.getElementById('addCityModal'));
    };

    /* Update City id on option change */
    const handle_province_changes = (newValue) => {
        params.value.province_id = newValue.province_id;
    }

    /* open modal in add and edit mode */
    const handle_edit = (city) => {        
        if (city) {
            reset_form();
            params.value = JSON.parse(JSON.stringify(city));
            getProvinceData();
        }
        addCityModal.show();
    };
    /* Save and update city */
    function handle_save(){
        is_submit_form.value = true;
        validateData.value.city_name = params.value.city_name;
        validateData.value.country_id = params.value.country_id;
        validateData.value.province_id = params.value.province_id;
        if (validation(validateData)) {
            let dispatchUral = '';
            if(params.value.id){
                dispatchUral = 'city/updateCity';
            }else{
                dispatchUral = 'city/saveCity';                
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('city/setButtonLoading', false);
                const currentData = store.state.city.city.data;
                if(params.value.id){
                    table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                }else {
                    table.value.data.splice(0,0,currentData);
                }
                reset_form();
                showMessage(data.message,'success');// type => success/error
                addCityModal.hide();
            }).catch((err) => {
                store.commit('city/setButtonLoading', false);
                showMessage(`${err.data.message}`,'error');// type => success/error
                addCityModal.hide();
            });
        }else {
            showMessage('Field Validation Error!','error');// type => success/error
        }
    }

    /* Delete city */
    function handle_delete(id) {
        new window.Swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em'
        }).then(result => {
            if (result.value) {
                store.dispatch("city/deleteCity", id).then(() => {
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === id),1);
                });
                showMessage('City has been deleted.','success');// type => success/error
            }
        });
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value = {id:null,city_name:'',province_id: '',city_status: true,country_id:''};
        is_submit_form.value = false;
        provinceOptions.value = [];
    };
    
    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'actions');
        exportTable(type,items.value,cols,'City');
    }
    /* define excel column */
    const excel_columns = () => {
        return {
            'ID': 'id',
            'Name': 'city_name',
            'Country Name': 'country_name',
            'Province Name': 'Province_name',
            Status: 'active_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

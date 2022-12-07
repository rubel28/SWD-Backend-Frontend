<template>
    <teleport to="#breadcrumb">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="javascript:">
                                    <SvgIcon icon="feather-home"></SvgIcon>
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
<!--    <Loader v-if="loading"></Loader>-->
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
                                <vue3-json-excel class="btn btn-primary m-1" name="city.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        

                        <v-server-table ref="table" :columns="columns" :options="table_option">

                            <template #actions="props">
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="edit-2"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" @click="handle_delete(props.row.id)" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="trash"></SvgIcon>
                                </a>
                            </template>                            
                            <template #id="props">{{ props.row.id }}</template>
                            <template #city_name="props">{{ props.row.city_name }}</template>
                            <template #active_status="props">{{ props.row.active_status }}</template>
                            <template #country_name="props">{{ props.row.country_id }}</template>
                            <template #state_name="props">{{ props.row.state_id }}</template>
                        </v-server-table>
                    </div>
                </div>                
            </div>
            <!-- Add City Modal-->
            <div id="addCityModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update City' : 'Add New City' }}</h5>
<!--                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>-->
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <TInput
                                                    id="name"
                                                    label="City Name"
                                                    placeholder="City Name *"
                                                    ref="city_name"
                                                    label-id="city_name"
                                                    type="text"
                                                    :maxlength="255"
                                                    :required-field="true"
                                                    v-model="params.city_name"
                                                    :is-submit-form="is_submit_form"
                                                />
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="country-name">Country</label>
                                                    <select v-model="params.country_id" class="form-select" id="country-name" @change="change_handle()"
                                                            :class="[is_submit_form ? (params.country_id ? 'is-valid' : 'is-invalid') : '']">
                                                        <option value="" disabled>Select Country</option>
                                                        <option v-for="(name, value) in options" :key="value" :value="value">
                                                            {{name}}
                                                        </option>
                                                    </select>
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please Select Country</div>
                                                </div>
<!--                                                <BaseSelect
                                                    id="country-name"
                                                    label="Country"
                                                    ref="country_name"
                                                    label-id="country_name"
                                                    :required-field="true"
                                                    v-model="params.country_id"
                                                    :options="options"
                                                    :is-submit-form="is_submit_form"
                                                    @change="change_handle()"
                                                />-->
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="state-name">State</label>
                                                    <select v-model="params.state_id" class="form-select" id="state-name"
                                                            :class="[is_submit_form ? (params.state_id ? 'is-valid' : 'is-invalid') : '']">
                                                        <option value="" disabled>Select State</option>
                                                        <option v-for="(name, value) in stateOptions" :key="value" :value="value">
                                                            {{name}}
                                                        </option>
                                                    </select>
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please Select State</div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <BaseSelect
                                                    id="status"
                                                    label="Status"
                                                    :required-field="false"
                                                    v-model="params.city_status"
                                                    :options="activeOptions"
                                                />
                                            </div>
                                        </div>
<!--                                        <div class="row">                                            
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
                                        </div>-->
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
            <!--/ Add City Modal-->

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
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import Loader from '@/views/backend/loader/default-loader';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";    
    import useExportTable from "@/composables/useExportTable";
    import TInput from '@/components/form/core/BaseInput.vue';
    import BaseSelect from '@/components/form/core/BaseSelect.vue';
    import DeleteModal from '@/components/form/DeleteModal.vue';
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    import axiosClient from '@/axios'
    
    /* Set page title */
    useMeta({ title: 'Province' });
    
    /* variable declaration */
    const { validation } = useValidation();
    const { showMessage,showAlert } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    const is_submit_form = ref(false);
    let addCityModal = ref(null);
    let deleteModal = ref(null);
    const pin = ref(null);
    const params = ref({
        city_name: '',
        city_status: 'ACTIVE',
        id:null,
        state_id: '',
        country_id: '',
    });
    const deleteParams = ref({
        city_id: null,
        pin: '',
    });
    const table = ref(null);
    const options = ref([]);
    const stateOptions = ref([]);
    const activeOptions = ref(store.state.constant.activeStatus);
    //const province_name = ref(null);
    const validateData = ref({ city_name:'',country_id:'',state_id:'' });
    const columns = ref(['id','city_name','state_name','country_name', 'city_status', 'actions']);
    const items = ref([]);
    //const tableData = ref([]);

    /* Set Data table option */
    const table_option = ref({        
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { action: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 3,edge: true,dropdown: false },
        orderBy:{column:'cities.id',ascending:true},
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
            //console.log(data);
            return {
                search_text: data.query,
                display_item_per_page: data.limit,
                page: data.page,
                orderBy: data.orderBy == 'id' || data.orderBy == 'country_code'? 'cities.'+ data.orderBy:data.orderBy,
                ascending: data.ascending,
                byColumn: data.byColumn,
            }
        },
        responseAdapter({data}) {
            items.value = data.data.cities;
            return {
                data: data.data.cities,
                count: data.data.total,
            }
        },
    });

    /* set city data and loader to state */
    //const loading = computed(() => store.state.country.allCountry.loading);
    const loadingSubmitted = computed(() =>  store.state.city.buttonLoading.loading);
    
    /* Mounted hook */
    onMounted(() => {
        getCountryData();
        //initPopup();
        //params.value.state_id = '';
    })
    
    /* get state data */
    function getStateData() {        
        store.dispatch('state/getAllSateByCountry', params.value.country_id).then(() => {
            stateOptions.value = store.state.state.allStateByCountry.data.reduce((acc,item) => {
                return {...acc, [item.id]: item.state_name};
            },{});
        });
    };
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

    function change_handle(){
        getStateData();
        params.value.state_id = '';
    }

    /* Modal init */
    const initPopup = () => {
        addCityModal = new window.bootstrap.Modal(document.getElementById('addCityModal'));
    };

    /* Delete Modal init */
    const initDeletePopup = () => {
        deleteModal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    };

    /* Update City id on option change */
   /* const handle_province_changes = (newValue) => {
        params.value.state_id = newValue.state_id;
    }*/

    /* open modal in add and edit mode */
    const handle_edit = (city) => {        
        if (city) {
            reset_form();
            params.value.id = city.id;
            params.value.city_name = city.city_name;
            params.value.state_id = city.state_id;
            params.value.country_id = city.country_id;
            params.value.city_status = city.city_status;
            getStateData();
        }
        addCityModal.show();
    };
    /* Save and update city */
    function handle_save(){
        is_submit_form.value = true;
        validateData.value.city_name = params.value.city_name;
        validateData.value.country_id = params.value.country_id;
        validateData.value.state_id = params.value.state_id;
        if (validation(validateData)) {
            let dispatchUral = 'city/saveCity';
            if(params.value.id){
                dispatchUral = 'city/updateCity';
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('city/setButtonLoading', false);
                if(data.data.status === true){
                    const currentData = store.state.city.city.data;
                    if(params.value.id){
                        table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                    }else {
                        table.value.data.splice(0,0,currentData);
                    }
                    showAlert(data.message,'success');// type => success/error
                    reset_form();
                    addCityModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }
            }).catch((err) => {
                console.log(err);
                store.commit('city/setButtonLoading', false);
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            //showMessage('Field Validation Error!','error');// type => success/error
        }
    }

    /* Delete city */
    function handle_delete(id) {
        reset_delete_form();
        deleteParams.value.city_id = id;
        deleteModal.show();
    }

    function delete_submit(){
        if(deleteParams.value.pin){
            store.dispatch("city/deleteCity",{...deleteParams.value}).then(({data}) => {
                //console.log(data.data.status);
                store.commit('city/setButtonLoading', false);
                if(data.data.status === true){
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === deleteParams.value.city_id),1);
                    showAlert(data.message,'success');// type => success/error
                    reset_delete_form();
                    deleteModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }

            }).catch((err) => {
                store.commit('city/setButtonLoading', false);
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            eval(pin).value?.focus();
        }

    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value = {id:null,city_name:'',state_id: '',city_status: 'ACTIVE',country_id:''};
        is_submit_form.value = false;
        stateOptions.value = [];
    };

    /* Reset all reactive/ref filed */
    const reset_delete_form = () => {
        deleteParams.value.city_id = null;
        deleteParams.value.pin = '';
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
            'State Name': 'state_name',
            Status: 'state_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

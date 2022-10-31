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
                            <li class="breadcrumb-item"><a href="javascript:">Utility Settings</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><span>Country</span></li>
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
                                <a id="addCountry" href="javascript:" @click="handle_edit(null)" class="btn me-2 btn-primary">
                                    <i data-feather="plus"></i>
                                    Add New
                                </a>
                            </div>
                            <div>
                                <button class="btn m-1 btn-primary" @click="export_table('csv')">CSV</button>
                                <vue3-json-excel class="btn btn-primary m-1" name="country.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        

                        <v-server-table ref="table" :columns="columns" :options="table_option">

                            <template #actions="props">
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="eye"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="edit-2"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" @click="handle_delete(props.row.id)" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="trash"></SvgIcon>
                                </a>
                            </template>
                            <template #country_name="props">
                                <div class="d-flex">
<!--                                    <div class="usr-img-frame me-2 rounded-circle">
                                        <img :src="`${props.row.country_logo_path}`" class="img-fluid rounded-circle" alt="avatar" />
                                    </div>-->
                                    <p class="align-self-center mb-0 admin-name">{{ `${props.row.country_emoji} ${props.row.country_name}` }}</p>
                                </div>
                            </template>
                            <template #id="props">{{ props.row.id }}</template>
                            <template #country_currency="props">{{ props.row.country_currency }}</template>
                            <template #country_iso2="props">{{ props.row.country_iso2 }}</template>
                            <template #country_iso3="props">{{ props.row.country_iso3 }}</template>
                            <template #country_phone_code="props">{{ props.row.country_phone_code }}</template>
                            <template #active_status="props">{{ props.row.country_status }}</template>
                        </v-server-table>
                    </div>
                </div>                
            </div>
            <!-- Add Country Modal -->
            <div id="addCountryModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update Country' : 'Add New Country' }}</h5>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-xl-2 col-lg-12 col-md-4">
                                                <div class="row">
                                                    <div class="col-sm-12 country-logo">
                                                        <div class="upload pe-md-6">
                                                            <input disabled ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
                                                            <img
                                                                v-if="params.country_logo_path"
                                                                :src="params.country_logo_path"
                                                                alt="country_logo"
                                                                class="logo-preview"
                                                                @click="$refs.fl_profile.click()"
                                                            />
                                                            <div v-else class="country-logo-preview upload-preview" @click="$refs.fl_profile.click()">
                                                                <div>
                                                                    <SvgIcon icon="upload-cloud"></SvgIcon>
                                                                </div>
                                                                <div class="mt-2">Click to Upload Logo</div>
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>
                                            <div class="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <TInput
                                                            id="name"
                                                            label="Country Name"
                                                            placeholder="Country Name *"
                                                            ref="country_name"
                                                            label-id="country-name"
                                                            type="text"
                                                            :maxlength="255"
                                                            :required-field="true"
                                                            v-model="params.country_name"
                                                            :is-submit-form="is_submit_form"
                                                        />
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <TInput
                                                            id="iso"
                                                            label="ISO2"
                                                            placeholder="ISO2"
                                                            type="text"
                                                            :maxlength="2"
                                                            :required-field="false"
                                                            v-model="params.country_iso2"
                                                        />
                                                    </div>                                                    
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <TInput
                                                            id="iso3"
                                                            label="ISO3"
                                                            placeholder="ISO3"
                                                            type="text"
                                                            :maxlength="3"
                                                            :required-field="false"
                                                            v-model="params.country_iso3"
                                                        />
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <TInput
                                                            id="country_code"
                                                            label="Country Code"
                                                            placeholder="Country Code"
                                                            type="text"
                                                            :required-field="false"
                                                            v-model="params.country_phone_code"
                                                        />
                                                    </div>                                                   
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <TInput
                                                            id="currency"
                                                            label="Country Currency"
                                                            placeholder="Country Currency"
                                                            type="text"
                                                            :required-field="false"
                                                            v-model="params.country_currency"
                                                        />
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <BaseSelect
                                                            id="status"
                                                            label="Status"
                                                            :required-field="false"
                                                            v-model="params.country_status"
                                                            :options="activeOptions"
                                                        />                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal">Discard</button>
                            <button v-if="loadingSubmitted" disabled type="button" class="btn btn-success">
                                <i data-feather="loader"></i>
                                Saving...
                            </button>
                            <button v-else type="submit" class="btn btn-success" @click="handle_save()">{{ params.id ? 'Update' : 'Add' }}</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--/ Add Country Modal-->

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
    import '@/assets/sass/components/custom-sweetalert.scss';
    import '@/assets/sass/country/country.scss';
    //import Loader from '@/views/backend/loader/default-loader';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";    
    import useExportTable from "@/composables/useExportTable";
    import TInput from '@/components/form/core/BaseInput.vue';
    import BaseSelect from '@/components/form/core/BaseSelect.vue';
    import DeleteModal from '@/components/form/DeleteModal.vue';
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    import axiosClient from "@/axios";
    import feather from 'feather-icons';
    
    /* Set page title */
    useMeta({ title: 'Country' });
    
    /* variable declaration */
    const { validation,is_submit_form } = useValidation();
    const { showMessage,showAlert } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    let addCountryModal = ref(null);
    let deleteModal = ref(null);
    const pin = ref(null);
    const activeOptions = ref(store.state.constant.activeStatus);
    const params = ref({
        country_iso2: '',
        country_name: '',
        country_iso3: '',
        country_phone_code:'',
        //image: '',
        //country_logo_path: '',
        country_status: 'ACTIVE',
        id:null,
        country_currency:'',
        country_currency_symbol:'None',
        country_latitude:'24.00000000',
        country_longitude:'90.00000000',
        country_emoji:'🇧🇩',
        country_emojiU:'U+1F1E7 U+1F1E9',
        country_flag:1,
        country_logo:'None',
    });
    const deleteParams = ref({
        country_id: null,
        pin: '',
    });
    //const country_name = ref(null);
    const table = ref(null);
    //const selected_file = ref(null);
    const validateData = ref({ country_name:'' });
    const columns = ref(['id', 'country_name', 'country_currency','country_iso2','country_iso3', 'country_phone_code', 'country_status', 'actions']);
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
        orderBy:{column:'country_name',ascending:true},
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
            loadingError: 'Oops! Something went wrong',
        },
        sortable: ['id', 'country_name', 'country_currency','country_iso2', 'country_iso3', 'country_phone_code','active_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        requestFunction(data) {
            return axiosClient.get('/countries', {
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
            items.value = data.data.countries;
            return {
                data: data.data.countries,
                count: data.data.total,
            }
        },
    });

    /* set country data and loader to state */
    //const loading = computed(() => store.state.country.countries.loading);
    const loadingSubmitted = computed(() =>  store.state.country.buttonLoading.loading);

    
    /* Mounted hook */
    onMounted(() => {
        feather.replace();
        initPopup();
        initDeletePopup();
        //getCountryData();
    })
    
    /* get country data */
    /*function getCountryData() {        
        store.dispatch('country/getCountries').then(() => {
            items.value = store.state.country.countries.data;
            initPopup();
        });
    }*/

    /* Modal init */
    const initPopup = () => {
        addCountryModal = new window.bootstrap.Modal(document.getElementById('addCountryModal'));
    };

    /* Delete Modal init */
    const initDeletePopup = () => {
        deleteModal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    };

    // get image file and imageUrl on upload
    const change_file = (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // The field to send on backend and apply validations
            params.value.image = reader.result;
            // The field to display here
            params.value.country_logo_path = reader.result;
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    /* open modal in add and edit mode */
    const handle_edit = (country) => {
        reset_form();
        if (country) {            
            //params.value = JSON.parse(JSON.stringify(country));
            params.value.country_name = country.country_name;
            params.value.country_status = country.country_status;
            params.value.country_phone_code = country.country_phone_code;
            params.value.country_iso2 = country.country_iso2;
            params.value.country_iso3 = country.country_iso3;
            params.value.country_currency = country.country_currency;
            params.value.id = country.id;
            params.value.country_currency_symbol = country.country_currency_symbol;
            params.value.country_latitude = country.country_latitude;
            params.value.country_longitude = country.country_longitude;
            params.value.country_emoji = country.country_emoji;
            params.value.country_emojiU = country.country_emojiU;
            params.value.country_flag = country.country_flag;
        }
        addCountryModal.show();
    };
    /* Save and update country */
    function handle_save(){
        is_submit_form.value = true;
        validateData.value.country_name = params.value.country_name;
        if (validation(validateData)) {
            let dispatchUral = 'country/saveCountry';
            if(params.value.id){
                dispatchUral = 'country/updateCountry';
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('country/setButtonLoading', false);
                if(data.data.status === true){
                    const currentData = store.state.country.country.data;
                    if(params.value.id){
                        table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                    }else {
                        table.value.data.splice(0,0,currentData);
                    }
                    showAlert(data.message,'success');// type => success/error
                    reset_form();
                    addCountryModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }
            }).catch((err) => {
                console.log(err);
                store.commit('country/setButtonLoading', false);
                showMessage('Something went really wrong!','error');// type => success/error
                //error.value = `${err.data.message}! ${err.data.data.error}`;
            });
        }else {
            //showMessage('Field Validation Error!','error');// type => success/error
        }
    }

    /* Delete country */
    function handle_delete(id) {
        reset_delete_form();
        deleteParams.value.country_id = id;
        deleteModal.show();
    }

    function delete_submit(){
        if(deleteParams.value.pin){
            store.dispatch("country/deleteCountry",{...deleteParams.value}).then(({data}) => {
                //console.log(data.data.status);
                store.commit('country/setButtonLoading', false);
                if(data.data.status === true){
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === deleteParams.value.country_id),1);
                    showAlert(data.message,'success');// type => success/error
                    reset_delete_form();
                    deleteModal.hide();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }

            }).catch((err) => {
                store.commit('country/setButtonLoading', false);
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            eval(pin).value?.focus();
        }

    }    

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value.id = null;
        params.value.country_name =  '';
        params.value.country_iso2 = '';
        params.value.country_iso3 = '';
        params.value.country_phone_code = '';
        //params.value.country_logo_path = '';
        params.value.country_currency = '';
        params.value.country_status = "ACTIVE";
        is_submit_form.value = false;
        //country_name.value.focus();
    };

    /* Reset all reactive/ref filed */
    const reset_delete_form = () => {
        deleteParams.value.country_id = null;
        deleteParams.value.pin = '';
    };
    
    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d !== 'actions');
        exportTable(type,items.value,cols,'Country');
    }
    /* define excel column */
    const excel_columns = () => {
        return {
            'ID': 'id',
            'Name': 'country_name',
            'Currency': 'country_currency',
            'ISO2': 'country_iso2',
            'ISO3': 'country_iso3',
            'Phone Code': 'country_phone_code',
            Status: 'country_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

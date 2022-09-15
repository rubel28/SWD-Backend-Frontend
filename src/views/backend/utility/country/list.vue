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
                            <li class="breadcrumb-item active" aria-current="page"><span>Country</span></li>
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
                                <vue3-json-excel class="btn btn-primary m-1" name="country.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        

                        <v-client-table :data="items" :columns="columns" :options="table_option">

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
                            <template #country_name="props">
                                <div class="d-flex">
                                    <div class="usr-img-frame me-2 rounded-circle">
                                        <img :src="`${props.row.country_logo_path}`" class="img-fluid rounded-circle" alt="avatar" />
                                    </div>
                                    <p class="align-self-center mb-0 admin-name">{{ props.row.country_name }}</p>
                                </div>
                            </template>
                            <template #id="props">{{ props.row.id }}</template>
                            <template #country_iso="props">{{ props.row.country_iso }}</template>
                            <template #country_iso3="props">{{ props.row.country_iso3 }}</template>
                            <template #country_phone_code="props">{{ props.row.country_phone_code }}</template>
                            <template #active_status="props">{{ props.row.active_status }}</template>
                        </v-client-table>
                    </div>
                </div>                
            </div>
            <!--Modal-->
            <div id="addCountryModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update Country' : 'Add New Country' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-xl-2 col-lg-12 col-md-4">
                                                <div class="row">
                                                    <div class=" col-sm-12 invoice-logo">
                                                        <div class="upload pe-md-6">
                                                            <input ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
                                                            <img
                                                                v-if="params.country_logo_path"
                                                                :src="params.country_logo_path ? params.country_logo_path : require('@/assets/images/user-profile.jpeg')"
                                                                alt="profile"
                                                                class="profile-preview"
                                                                @click="$refs.fl_profile.click()"
                                                            />
                                                            <div v-else class="profile-preview upload-preview" @click="$refs.fl_profile.click()">
                                                                <div>
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
                                                                        class="feather feather-upload-cloud"
                                                                    >
                                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                                        <line x1="12" y1="12" x2="12" y2="21"></line>
                                                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                                    </svg>
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
                                                        <div class="form-group">
                                                            <label for="name"><strong>Country Name</strong></label>
                                                            <input v-model="params.country_name"
                                                                   id="name" type="text"
                                                                   name="country_name"
                                                                   class="form-control"
                                                                   placeholder="Country Name"
                                                                   ref="country_name"
                                                                   :class="[is_submit_form ? (params.country_name ? 'is-valid' : 'is-invalid') : '']"
                                                            />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please fill the Country Name</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="iso">ISO</label>
                                                            <input v-model="params.country_iso"
                                                                   id="iso" type="text"
                                                                   name="country_iso"
                                                                   class="form-control"
                                                                   placeholder="Country ISO"
                                                            />
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="iso3">ISO3</label>
                                                            <input v-model="params.country_iso3"
                                                                   id="iso3" type="text"
                                                                   class="form-control"
                                                                   name="country_iso3"
                                                                   placeholder="Country ISO3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="country_code">Country Code</label>
                                                            <input v-model="params.country_phone_code"
                                                                   id="country_code" type="text"
                                                                   class="form-control"
                                                                   name="country_phone_code"
                                                                   placeholder="Country Phone Code"
                                                            />
                                                        </div>
                                                    </div>                                                   
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="country_status">Active Status</label>
                                                            <div id="country_status" class="col-lg-3 col-md-3 col-sm-4 col-6">
                                                                <label class="switch s-outline s-outline-success mb-4 me-2">
                                                                    <input
                                                                        v-model="params.country_status"
                                                                        type="checkbox"
                                                                        name="country_status"
                                                                    />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </div>
                                                        </div>
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

<script setup>
    import {computed, onMounted, ref, watch, watchEffect} from 'vue';
    import '@/assets/sass/components/custom-sweetalert.scss';
    import '@/assets/sass/country/country.scss';
    import Loader from '@/views/backend/loader/default-loader';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";    
    import useExportTable from "@/composables/useExportTable";    
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    
    /* Set page title */
    useMeta({ title: 'Country' });
    
    /* variable declaration */
    const { validation,is_submit_form } = useValidation();
    const { showMessage } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    let addCountryModal = ref(null);
    const params = ref({
        country_iso: '',
        country_name: '',
        country_iso3: '',
        country_phone_code:'',
        image: '',
        country_status: true,
        country_logo_path: '',
        id:null,
    });
    //const country_name = ref(null);
    const selected_file = ref(null);
    const validateData = ref({ country_name:'' });
    const columns = ref(['id', 'country_name', 'country_iso','country_iso3', 'country_phone_code', 'active_status', 'action']);
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
        sortable: ['id', 'country_name', 'country_iso', 'country_iso3', 'country_phone_code','active_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
        filterByColumn:false,
    });

    /* set country data and loader to state */
    const loading = computed(() => store.state.country.countries.loading);
    const loadingSubmitted = computed(() =>  store.state.country.buttonLoading.loading);

    // get data for custom validation
    watchEffect(() => {
        validateData.value.country_name = params.value.country_name;
    })
    /* Mounted hook */
    onMounted(() => {
        getCountryData();
    })
    
    /* get country data */
    function getCountryData() {        
        store.dispatch('country/getCountries').then(() => {
            items.value = store.state.country.countries.data;
            initPopup();
        });
    };

    /* Modal init */
    const initPopup = () => {
        addCountryModal = new window.bootstrap.Modal(document.getElementById('addCountryModal'));
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
            params.value = JSON.parse(JSON.stringify(country));
        }
        addCountryModal.show();
    };
    /* Save and update country */
    function handle_save(){
        is_submit_form.value = true;
        if (validation(validateData)) {
            let dispatchUral = '';
            if(params.value.id){
                dispatchUral = 'country/updateCountry';
            }else{
                dispatchUral = 'country/saveCountry';                
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('country/setButtonLoading', false);
                const currentData = store.state.country.country.data;
                if(params.value.id){
                    items.value[items.value.findIndex((d) => d.id === params.value.id)] = currentData;
                }else {
                    items.value.splice(0,0,currentData);
                }
                showMessage(data.message,'success');// type => success/error
                addCountryModal.hide();
            }).catch((err) => {
                store.commit('country/setButtonLoading', false);
                //error.value = `${err.data.message}! ${err.data.data.error}`;
            });
        }else {
            showMessage('Field Validation Error!','error');// type => success/error
        }
    }

    /* Delete country */
    function handle_delete(id) {
        new window.Swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em'
        }).then(result => {
            if (result.value) {
                store.dispatch("country/deleteCountry", id).then(() => {
                    items.value = items.value.filter((d) => d.id != id);
                });
                showMessage('Country has been deleted.','success');// type => success/error
            }
        });
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value = {id:null,country_name: '',country_iso: '',country_iso3: '',country_phone_code:'',country_logo:'',country_status: true};
        selected_file.value = null;
        is_submit_form.value = false;
        //country_name.value.focus();
    };
    
    /* Export table function */
    const export_table = (type) => {
        exportTable(type,items.value,columns.value);
    }
    /* define excel column */
    const excel_columns = () => {
        return {
            'ID': 'id',
            'Name': 'country_name',
            'ISO': 'country_iso',
            'ISO3 No': 'country_iso3',
            'Phone Code': 'country_phone_code',
            Status: 'active_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

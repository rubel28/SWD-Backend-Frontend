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
                            <li class="breadcrumb-item"><a href="javascript:;">Utility Settings</a></li>
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
                                <a id="addCountry" href="javascript:;" @click="handle_edit()" class="btn me-2 btn-primary">
                                    <i data-feather="plus"></i>
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
                        

                        <v-server-table ref="table" :columns="columns" :options="table_option">

                            <template #actions="props">
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="edit-2"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" @click="handle_delete(props.row.id)" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="trash"></SvgIcon>
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
                        </v-server-table>
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
                                                    <div class="col-sm-12 country-logo">
                                                        <div class="upload pe-md-6">
                                                            <input ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
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
                                                        <div class="form-group">
                                                            <label for="name"><strong>Country Name</strong></label>
                                                            <input v-model="params.country_name"
                                                                   id="name" type="text"
                                                                   name="country_name"
                                                                   class="form-control"
                                                                   placeholder="Country Name *"
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
                                                                   placeholder="Country ISO *"
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
                                <i data-feather="loader"></i>
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
    import axiosClient from "@/axios";
    import feather from 'feather-icons';
    
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
    const table = ref(null)
    const selected_file = ref(null);
    const validateData = ref({ country_name:'' });
    const columns = ref(['id', 'country_name', 'country_iso','country_iso3', 'country_phone_code', 'active_status', 'actions']);
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
        sortable: ['id', 'country_name', 'country_iso', 'country_iso3', 'country_phone_code','active_status'],
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

    /* set country data and loader to state */
    //const loading = computed(() => store.state.country.countries.loading);
    const loadingSubmitted = computed(() =>  store.state.country.buttonLoading.loading);

    // get data for custom validation
    watchEffect(() => {
        validateData.value.country_name = params.value.country_name;
    })
    /* Mounted hook */
    onMounted(() => {
        feather.replace();
        initPopup();
        //getCountryData();
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
                    table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                }else {
                    table.value.data.splice(0,0,currentData);
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
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === id),1);
                });
                showMessage('Country has been deleted.','success');// type => success/error
            }
        });
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value.id = null;
        params.value.country_name =  '';
        params.value.country_iso = '';
        params.value.country_iso3 = '';
        params.value.country_phone_code = '';
        params.value.country_logo_path = '';
        params.value.country_status = true;
        is_submit_form.value = false;
        //country_name.value.focus();
    };
    
    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'actions');
        exportTable(type,items.value,cols,'Country');
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

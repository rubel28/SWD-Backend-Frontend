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
                            <li class="breadcrumb-item active" aria-current="page"><span>Bank</span></li>
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
                                <vue3-json-excel class="btn btn-primary m-1" name="bank.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>
                        

                        <v-client-table ref="table" :data="items" :columns="columns" :options="table_option">

                            <template #actions="props">
                                <router-link :to="{name:'bank.preview',params:{id:props.row.id}}" title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="eye"></SvgIcon>
                                </router-link>
                                <a href="javascript:void(0);" @click="handle_edit(props.row)" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="edit-2"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" @click="handle_delete(props.row.id)" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="trash"></SvgIcon>
                                </a>
                            </template>
                            <template #bank_name="props">
                                <div class="d-flex">
                                    <div class="usr-img-frame me-2 rounded-circle">
                                        <img  :src="require('@/assets/images/flags/en.png')" class="img-fluid rounded-circle" alt="bank-logo" />
<!--                                        <img  :src="`${props.row.bank_logo_path}`" class="img-fluid rounded-circle" alt="bank-logo" />-->
                                    </div>
                                    <p class="align-self-center mb-0 admin-name">{{ props.row.bank_name }}</p>
                                </div>
                            </template>
                            <template #id="props">{{ props.row.id }}</template>
                            <template #swift_code="props">{{ props.row.swift_code }}</template>
                            <template #country_name="props">{{ props.row.country_name }}</template>
                            <template #active_status="props">{{ props.row.active_status }}</template>
                        </v-client-table>
                    </div>
                </div>                
            </div>
            <!--Modal-->
            <div id="addBankModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update Bank' : 'Add New Bank' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-xl-2 col-lg-12 col-md-4">
                                                <div class="row">
                                                    <div class="col-sm-12 bank-logo">
                                                        <div class="upload pe-md-6">
                                                            <input ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
                                                            <img
                                                                v-if="params.bank_logo_path"
                                                                :src="params.bank_logo_path"
                                                                alt="bank_logo"
                                                                class="logo-preview"
                                                                @click="$refs.fl_profile.click()"
                                                            />
                                                            <div v-else class="bank-logo-preview upload-preview" @click="$refs.fl_profile.click()">
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
                                                            <label for="name"><strong>Bank Name</strong></label>
                                                            <input v-model="params.bank_name"
                                                                   id="name" type="text"
                                                                   name="bank_name"
                                                                   class="form-control"
                                                                   placeholder="Bank Name *"
                                                                   ref="bank_name"
                                                                   :class="[is_submit_form ? (params.bank_name ? 'is-valid' : 'is-invalid') : '']"
                                                            />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please fill the Bank Name</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="country_name">Country Name</label>
                                                            <select v-model="params.country_id" class="form-select" id="country_name"
                                                                    :class="[is_submit_form ? (params.country_id ? 'is-valid' : 'is-invalid') : '']">
                                                                <option value="" disabled>Select Country *</option>
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
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="swift_code">Swift Code</label>
                                                            <input v-model="params.swift_code"
                                                                   id="swift_code" type="text"
                                                                   class="form-control"
                                                                   name="swift_code"
                                                                   placeholder="Swift Code"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="bank_status">Active Status</label>
                                                            <div id="bank_status" class="col-lg-3 col-md-3 col-sm-4 col-6">
                                                                <label class="switch s-outline s-outline-success mb-4 me-2">
                                                                    <input
                                                                        v-model="params.bank_status"
                                                                        type="checkbox"
                                                                        name="bank_status"
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
    import '@/assets/sass/bank/bank.scss';
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
    const { validation } = useValidation();
    const { showMessage } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    const is_submit_form = ref(false);
    let addBankModal = ref(null);
    const params = ref({
        bank_name: '',
        country_id: '',
        swift_code:'',
        image: '',
        bank_status: true,
        bank_logo_path: '',
        id:null,
    });
    //const country_name = ref(null);
    const options = ref([]);
    const table = ref(null)
    const validateData = ref({ bank_name:'',country_id:'' });
    const columns = ref(['id', 'bank_name', 'country_name','swift_code', 'active_status', 'actions']);
    const items = ref([]);

    /* Set Data table option */
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { actions: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 3,edge: true,dropdown: false },
        /*debounce: 500,
        filterByColumn:false,
        filterable:true,
        orderBy:{column:'country_name',ascending:true},*/
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
            loadingError: 'Oops! Something went wrong',
        },
        sortable: ['id', 'bank_name', 'country_name', 'swift_code','active_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        /*requestFunction(data) {
            return axiosClient.get('/countries', {
                params: data
            }).catch(function (e) {
                this.dispatch('error',e);
            })
        },
        requestAdapter(data) {
            return {
                sort: data.orderBy ? data.orderBy : 'bank_name',
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
        },*/
    });

    /* set country data and loader to state */
    //const loading = computed(() => store.state.country.countries.loading);
    const loadingSubmitted = computed(() =>  store.state.country.buttonLoading.loading);

    // get data for custom validation
    watchEffect(() => {
        validateData.value.bank_name = params.value.bank_name;
    })
    /* Mounted hook */
    onMounted(() => {
        feather.replace();
        bind_data();
        getCountryData();
        //initPopup();
    })
    
    const bind_data = () => {
        items.value = [
            {id:1,bank_name:'AB Bank',country_id:18,country_name:'Bangladesh',swift_code:'22321',active_status:'ACTIVE',bank_status:true},
            {id:2,bank_name:'IFIC Bank',country_id:18,country_name:'Bangladesh',swift_code:'223221',active_status:'ACTIVE',bank_status:true},
            {id:3,bank_name:'BRAC Bank',country_id:18,country_name:'Bangladesh',swift_code:'2232221',active_status:'ACTIVE',bank_status:true},
            {id:4,bank_name:'DBBL',country_id:18,country_name:'Bangladesh',swift_code:'2223221',active_status:'ACTIVE',bank_status:true},
        ]
    };
    
    /* get country data */
    function getCountryData() {        
        store.dispatch('country/getCountries').then(() => {
            options.value = store.state.country.countries.data;
            initPopup();
        });
    };

    /* Modal init */
    const initPopup = () => {
        addBankModal = new window.bootstrap.Modal(document.getElementById('addBankModal'));
    };   

    // get image file and imageUrl on upload
    const change_file = (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // The field to send on backend and apply validations
            params.value.image = reader.result;
            // The field to display here
            params.value.bank_logo_path = reader.result;
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    /* open modal in add and edit mode */
    const handle_edit = (bank) => {
        reset_form();
        if (bank) {
            params.value = JSON.parse(JSON.stringify(bank));
        }
        addBankModal.show();
    };
    /* Save and update country */
    function handle_save(){
        is_submit_form.value = true;
        if (validation(validateData)) {
            let dispatchUral = '';
            if(params.value.id){
                dispatchUral = 'bank/updateBank';
            }else{
                dispatchUral = 'bank/saveBank';                
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('bank/setButtonLoading', false);
                const currentData = store.state.bank.bank.data;
                if(params.value.id){
                    table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                }else {
                    table.value.data.splice(0,0,currentData);
                }
                showMessage(data.message,'success');// type => success/error
                addBankModal.hide();
            }).catch((err) => {
                store.commit('bank/setButtonLoading', false);
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
                store.dispatch("bank/deleteBank", id).then(() => {
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === id),1);
                });
                showMessage('Bank has been deleted.','success');// type => success/error
            }
        });
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value.id = null;
        params.value.country_id = '';
        params.value.bank_name = '';
        params.value.swift_code = '';
        params.value.bank_logo_path = '';
        params.value.bank_status = true;
        is_submit_form.value = false;
        //country_name.value.focus();
    };
    
    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'actions');
        exportTable(type,items.value,cols,'Bank');
    }
    /* define excel column */
    const excel_columns = () => {
        return {
            'ID': 'id',
            'Name': 'bank_name',
            'Country': 'country_name',
            'Swift Code': 'swift_code',
            Status: 'active_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

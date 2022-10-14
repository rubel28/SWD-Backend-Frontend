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
                            <li class="breadcrumb-item active" aria-current="page"><span>Branch</span></li>
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
                                <vue3-json-excel class="btn btn-primary m-1" name="branch.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
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
                            <template #branch_name="props">
                                {{ props.row.branch_name }}
                            </template>
                            <template #id="props">{{ props.row.id }}</template>
                            <template #branch_code="props">{{ props.row.branch_code }}</template>
                            <template #country_name="props">{{ props.row.country_name }}</template>
                            <template #active_status="props">{{ props.row.active_status }}</template>
                        </v-client-table>
                    </div>
                </div>                
            </div>
            <!--Modal-->
            <div id="addBranchModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ params.id ? 'Update Branch' : 'Add New Branch' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="compose-box">
                                <div class="compose-content">
                                    <form>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <TInput
                                                        id="name"
                                                        label="Branch Name"
                                                        placeholder="Branch Name *"
                                                        ref="branch_name"
                                                        label-id="branch_name"
                                                        type="text"
                                                        :required-field="true"
                                                        v-model="params.branch_name"
                                                        :is-submit-form="is_submit_form"
                                                    />                                                    
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <BaseSelect
                                                        id="country_name"
                                                        label="Country Name"
                                                        :required-field="false"
                                                        v-model="params.country_id"
                                                        :options="options"
                                                    />
                                                </div>
                                            </div>                                                    
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <BaseSelect
                                                        id="bank-name"
                                                        label="Bank Name"
                                                        ref="bank_name"
                                                        label-id="bank_name"
                                                        :required-field="true"
                                                        v-model="params.bank_id"
                                                        :options="{1:'IFIC Bank',1:'DBBL',3:'BRAC Bank'}"
                                                        :is-submit-form="is_submit_form"
                                                    />
                                                </div>
                                            </div>                                                    
                                        </div>
                                        <div class="row">                                                    
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <TInput
                                                        id="branch_code"
                                                        label="Branch Code"
                                                        placeholder="Branch Code"
                                                        type="text"
                                                        :required-field="false"
                                                        v-model="params.branch_code"
                                                    />                                                    
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <TInput
                                                        id="routing_number"
                                                        label="Routing Number"
                                                        placeholder="Routing Number"
                                                        type="text"
                                                        :required-field="false"
                                                        v-model="params.routing_number"
                                                    />
                                                    </div>
                                                </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <TInput
                                                        id="phone_number"
                                                        label="Phone"
                                                        placeholder="Phone"
                                                        type="text"
                                                        :required-field="false"
                                                        v-model="params.phone_number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <BaseEmailInput
                                                        id="email_address"
                                                        label="Email Address"
                                                        placeholder="Email Address"
                                                        type="email"
                                                        :required-field="false"
                                                        v-model="params.email_address"
                                                        :is-valid-email ="email_validate(params.email_address)"
                                                        :is-submit-form="is_submit_form"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <TInput
                                                        id="address"
                                                        label="Address"
                                                        placeholder="Address"
                                                        type="text"
                                                        :required-field="false"
                                                        v-model="params.branch_address"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="bank_status">Active Status</label>
                                                    <div id="bank_status" class="col-lg-3 col-md-3 col-sm-4 col-6">
                                                        <label class="switch s-outline s-outline-success mb-4 me-2">
                                                            <input
                                                                v-model="params.branch_status"
                                                                type="checkbox"
                                                                name="branch_status"
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
    import TInput from '@/components/form/core/BaseInput.vue';
    import BaseEmailInput from '@/components/form/core/BaseEmailInput.vue';
    import BaseSelect from '@/components/form/core/BaseSelect.vue';
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    import axiosClient from "@/axios";
    import feather from 'feather-icons';
    
    /* Set page title */
    useMeta({ title: 'Country' });
    
    /* variable declaration */
    const { validation,email_validate } = useValidation();
    const { showMessage } = useShowMessage();
    const { exportTable } = useExportTable();
    const store = useStore();
    const error = ref(null);
    const is_submit_form = ref(false);
    let addBranchModal = ref(null);
    const params = ref({
        branch_name: '',
        bank_id: '',
        country_id: '',
        branch_code:'',
        routing_number:'',
        phone_number:'',
        email_address:'',
        branch_address:'',
        branch_status: true,
        id:null,
    });
    //const country_name = ref(null);
    const options = ref({});
    const table = ref(null)
    const validateData = ref({ branch_name:'',bank_id:'' });
    const columns = ref(['id', 'branch_name','bank_name', 'country_name','branch_code','routing_number','phone_number','email_address','branch_address', 'active_status', 'actions']);
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
        sortable: ['id', 'branch_name','bank_name', 'country_name','branch_code','routing_number','phone_number','email_address'],
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
        //validateData.value.branch_name = params.value.branch_name;
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
            {id:1,branch_name:'Mohammadpur',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'22321',routing_number:'223433321',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:2,branch_name:'Dhanmondi',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'22331',routing_number:'245233321',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:3,branch_name:'Ring Road',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'2222321',routing_number:'534534534',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:4,branch_name:'Shamoli',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'2232321',routing_number:'563433322',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:5,branch_name:'Shamoli',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'2232321',routing_number:'563433322',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:6,branch_name:'Shamoli',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'2232321',routing_number:'563433322',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:7,branch_name:'Shamoli',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'2232321',routing_number:'563433322',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:8,branch_name:'Shamoli',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'2232321',routing_number:'563433322',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
            {id:9,branch_name:'Shamoli',bank_name:'AB Bank',bank_id:1,country_id:18,country_name:'Bangladesh',branch_code:'2232321',routing_number:'563433322',phone_number:'3535345432',email_address:'abd@dsf.dd',branch_address:'Dhaka-1207',active_status:'ACTIVE',branch_status:true},
        ]
    };
    
    /* get country data */
    function getCountryData() {        
        store.dispatch('country/getCountries').then(() => {            
            options.value = store.state.country.countries.data.reduce((accumulator, item) => {
                return {...accumulator, [item.id]: item.country_name};
            },{});
            initPopup();
        });
    };

    /* Modal init */
    const initPopup = () => {
        addBranchModal = new window.bootstrap.Modal(document.getElementById('addBranchModal'));
    };

    /* open modal in add and edit mode */
    const handle_edit = (branch) => {
        reset_form();
        if (branch) {
            params.value = JSON.parse(JSON.stringify(branch));
        }
        addBranchModal.show();
    };
    /* Save and update country */
    function handle_save(){        
        is_submit_form.value = true;
        validateData.value.branch_name = params.value.branch_name;
        validateData.value.bank_id = params.value.bank_id;
        if (validation(validateData)) {
            let dispatchUral = '';
            if(params.value.id){
                dispatchUral = 'branch/updateBranch';
            }else{
                dispatchUral = 'branch/saveBranch';                
            }
            store.dispatch(dispatchUral,{...params.value}).then(({data}) => {
                //console.log(data.data);
                store.commit('branch/setButtonLoading', false);
                const currentData = store.state.branch.branch.data;
                if(params.value.id){
                    table.value.data[table.value.data.findIndex((d) => d.id === params.value.id)] = currentData;
                }else {
                    table.value.data.splice(0,0,currentData);
                }
                showMessage(data.message,'success');// type => success/error
                addBranchModal.hide();
            }).catch((err) => {
                store.commit('branch/setButtonLoading', false);
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
                store.dispatch("branch/deleteBranch", id).then(() => {
                    table.value.data.splice(table.value.data.findIndex((d) => d.id === id),1);
                });
                showMessage('Branch has been deleted.','success');// type => success/error
            }
        });
    }

    /* Reset all reactive/ref filed after successful insert */
    const reset_form = () => {
        params.value.id = null;
        params.value.branch_name = null;
        params.value.country_id = '';
        params.value.bank_id = '';
        params.value.branch_code = '';
        params.value.routing_number = '';
        params.value.branch_address = '';
        params.value.email_address = '';
        params.value.phone_number = '';
        params.value.branch_status = true;
        is_submit_form.value = false;
        //country_name.value.focus();
    };
    
    /* Export table function */
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'actions');
        exportTable(type,items.value,cols,'Branch');
    }
    /* define excel column */
    const excel_columns = () => {
        return {
            'ID': 'id',
            'Name': 'branch_name',
            'Bank Name': 'bank_name',
            'Country': 'country_name',
            'Branch Code': 'branch_code',
            'Routing Number': 'routing_number',
            'Phone': 'phone_number',
            'Email': 'email_address',
            'Address': 'branch_address',
            Status: 'active_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

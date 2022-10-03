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
                                <li class="breadcrumb-item"><a href="javascript:;">User Manage</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>All User</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">
            <div class="col-12 layout-spacing">
                <div class="panel br-6">
                    <div class="custom-table panel-body p-0">
                        <div class="d-flex flex-wrap justify-content-between px-3 pt-3 pb-0">
                            <div>
                                <router-link :to="{name: 'user-add'}" class="btn me-2 btn-primary">
                                    <i data-feather="plus"></i>
                                    Add New
                                </router-link>
                            </div>
                            <div>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('csv')">CSV</button>
                                <vue3-json-excel class="btn btn-primary m-1" name="table.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>

                        <v-client-table :data="items" :columns="columns" :options="table_option">                            
                            <template #action>
                                <a href="javascript:void(0);" title="View" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="eye"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="edit-2"></SvgIcon>
                                </a>
                                <a href="javascript:void(0);" title="Delete" data-bs-toggle="tooltip" data-bs-placement="top">
                                    <SvgIcon icon="trash"></SvgIcon>
                                </a>
                            </template>
                            <template #KYC_status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.KYC_status">{{ props.row.KYC_status }}</span>
                            </template>
                            <template #PEP_status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.PEP_status">{{ props.row.PEP_status }}</span>
                            </template>
                            <template #monthly_limit="props"> ${{ props.row.monthly_limit }} </template>
                            <template #reset_password="props">
                                <a href="javascript:" class="cancel" @click="password_reset(props.row)">
                                    <button type="button" class="btn btn-primary btn-sm">Reset</button>
                                </a>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import feather from 'feather-icons';
    import { useMeta } from '@/composables/use-meta';
    import useShowMessage from "@/composables/useShowMessage";
    import useExportTable from "@/composables/useExportTable";
    
    useMeta({ title: 'All User' });
    const { showMessage } = useShowMessage();
    const { exportTable } = useExportTable();

    const columns = ref(['customer_id', 'customer_name', 'passport_no',
        'mobile_no', 'email_address', 'address', 'monthly_limit','Source_of_wealth',
        'source_of_fund','KYC_status','PEP_status','reset_password', 'action']);
    const items = ref([]);
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
        sortable: ['customer_id', 'customer_name', 'passport_no', 'mobile_no', 'email_address',
            'monthly_limit','Source_of_wealth','source_of_fund','KYC_status','PEP_status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
    });

    onMounted(() => {
        bind_data();
        feather.replace();
    });

    const bind_data = () => {
        items.value = [
            { customer_id: 1, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 2, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 3, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 4, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 5, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 6, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 7, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 8, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 9, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 10, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 11, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 12, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },
            { customer_id: 13, customer_name: 'Tiger Nixon', passport_no: 'AB00021', mobile_no: '65012222333', email_address: 'nixon@abc.com',address:'Singapore', monthly_limit: '50,000', Source_of_wealth: 'Salary', source_of_fund: 'Salary',KYC_status:'success',PEP_status:'success' },

        ];
    };

    const password_reset = (item) => {
        alert('Reset password for ' + item.customer_name);
    };

    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'reset_password' && d != 'action');
        exportTable(type,items.value,cols,'Users');
    };

    const excel_columns = () => {
        return {
            'Customer ID': 'customer_id',
            'Customer Name': 'customer_name',
            'Passport/ID No': 'passport_no',
            'Mobile No': 'mobile_no',
            'Email Address': 'email_address',
            Address: 'address',
            'Monthly Limit': 'monthly_limit',
            'Source of Wealth': 'Source_of_wealth',
            'Source of Fund':'source_of_fund',
            'KYC Status':'KYC_status',
            'PEP Status':'PEP_status',
        };
    };
    const excel_items = () => {
        return items.value;
    };

</script>

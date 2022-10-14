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
                                <li class="breadcrumb-item"><a href="javascript:;">Role Manage</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>All Role</span></li>
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
                                <router-link :to="{name: 'role-add'}" class="btn me-2 btn-primary">
                                    <i data-feather="plus"></i>
                                    Add New
                                </router-link>
                            </div>
                            <div>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('csv')">CSV</button>
                                <vue3-json-excel class="btn btn-primary m-1" name="country.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                                <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                            </div>
                        </div>

                        <v-client-table :data="items" :columns="columns" :options="table_option">

                            
                            <template #actions>
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
                            <template #permission="props">
                                <a href="javascript:" class="btn me-2 btn-success" @click="getPermission(props.row)">
                                    <SvgIcon icon="edit"></SvgIcon>
                                    Permissions
                                </a>
                            </template>
<!--                            <template #service="props">
                                <a href="javascript:" class="btn me-2 btn-success" @click="getService(props.row)">
                                    <SvgIcon icon="edit"></SvgIcon>
                                    Services
                                </a>
                            </template>-->
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
    import useShowMessage from "@/composables/useShowMessage";
    import useExportTable from "@/composables/useExportTable";
    import { useMeta } from '@/composables/use-meta';
    
    useMeta({ title: 'All Roles' });
    const { showMessage } = useShowMessage();
    const { exportTable } = useExportTable();
    
    const columns = ref(['id', 'role', 'permission', 'actions']);
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
        sortable: ['id', 'role'],
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
            { id: 1, role: 'Super Admin' },
            { id: 2, role: 'Admin' },
            { id: 3, role: 'User' },
            { id: 4, role: 'Customer Support' },
            { id: 5, role: 'Executor'},
            { id: 6, role: 'Master User' },
        ];
    };
    
    const password_reset = (item) => {
        alert('Reset password for ' + item.customer_name);
    };
    
    const export_table = (type) => {
        let cols = columns.value.filter((d) => d != 'permission' && d != 'actions');
        exportTable(type,items.value,cols,'Roles');    
    };
    
    const excel_columns = () => {
        return {
            'Role ID': 'id',
            'Role Name': 'role',        
        };
    };
    const excel_items = () => {
        return items.value;
    };
</script>

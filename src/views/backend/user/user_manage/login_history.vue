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
                            <li class="breadcrumb-item"><a href="javascript:;">User Manage</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><span>Login Histories</span></li>
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
            <div v-else class="col-12 layout-spacing">
                <div class="panel br-6">
                    <div class="custom-table panel-body p-0">
                        <div class="d-flex flex-wrap justify-content-center justify-content-sm-start px-3 pt-3 pb-0">
                            <button variant="primary" class="btn m-1 btn-primary" @click="export_table('csv')">CSV</button>
                            <vue3-json-excel class="btn btn-primary m-1" name="login_history.xls" :fields="excel_columns()" :json-data="excel_items()">Excel</vue3-json-excel>
                            <button variant="primary" class="btn m-1 btn-primary" @click="export_table('print')">Print</button>
                            <button variant="primary" class="btn m-1 btn-primary" @click="export_table('pdf')">PDF</button>
                        </div>

                        <v-client-table ref="myTable" :data="items" :columns="columns" :options="table_option">

                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { useStore } from 'vuex';
    import Loader from '@/views/backend/loader/default-loader';

    //pdf export
    import jsPDF from 'jspdf';
    import 'jspdf-autotable';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Login History' });
    const store = useStore();
    const error = ref(null);

    const columns = ref(['user_name', 'mobile_number','browser', 'iP', 'address', 'mac_address','login_status','date']);
    //const items = ref([]);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { action: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 5,edge: false },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        sortable: ['user_name', 'mobile_number','browser', 'iP', 'address', 'mac_address','login_status','date'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
        filterByColumn: false,
    });

    // set Login history data and loader to state
    const loading = computed(() => store.state.loginHistory.loginHistory.loading);
    const items = ref(computed(() => store.state.loginHistory.loginHistory.data));
    // get Login History data
    const myTable = ref();
    onMounted(() => {
        //myTable.setLoadingState(true);
        store.dispatch('loginHistory/getLoginHistory')
    })


    const export_table = (type) => {
        let cols = columns.value.filter((d) => d);
        let records = items.value;
        let filename = 'Login History';

        if (type == 'csv') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = cols
                .map((d) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item) => {
                cols.map((d, index) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !window.navigator.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type == 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            cols.map((d) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            records.map((item) => {
                rowhtml += '<tr>';
                cols.map((d) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
            // winPrint.close();
        } else if (type == 'pdf') {
            cols = cols.map((d) => {
                return { header: capitalize(d), dataKey: d };
            });
            const doc = new jsPDF('l', 'pt', cols.length > 10 ? 'a3' : 'a4');
            doc.autoTable({
                headStyles: { fillColor: '#eff5ff', textColor: '#515365' },
                columns: cols,
                body: records,
                styles: { overflow: 'linebreak' },
                pageBreak: 'auto',
                margin: { top: 45 },
                didDrawPage: () => {
                    doc.text('All User', cols.length > 10 ? 535 : 365, 30);
                },
            });
            doc.save(filename + '.pdf');
        }
    };

    const excel_columns = () => {
        return {
            'User Name': 'user_name',
            'Mobile No': 'mobile_number',
            'Browser': 'browser',
            IP: 'iP',
            'MAC Address': 'mac_address',
            Address: 'address',
            'Login Status':'login_status',
            'Date':'date',
        };
    };
    const excel_items = () => {
        return items.value;
    };
    const capitalize = (text) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };
</script>

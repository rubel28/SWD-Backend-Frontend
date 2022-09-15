//pdf export
import jsPDF from "jspdf";
import 'jspdf-autotable';

const exportTable = (type,items,columns) => {
    let cols = columns.filter((d) => d != 'action');
    let records = items;
    let filename = 'Country';

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
}
const capitalize = (text) => {
    return text
        .replace('_', ' ')
        .replace('-', ' ')
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};
const useExportTable = () => {
    return { exportTable }
}
export default useExportTable

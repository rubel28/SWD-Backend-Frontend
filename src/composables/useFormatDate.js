//import {ref} from "vue";

const formatDate = (date,format) => {
    let newDate = date;
    let dd = newDate.getDate();
    let mm = newDate.getMonth()+1;
    let yyyy = newDate.getFullYear();
    let hh = newDate.getHours();
    let m = newDate.getMinutes();
    let yy = yyyy.toString().slice(-2);
    //console.log(yy);
    if(dd<10)
    {
        dd=`0${dd}`;
    }
    if(mm<10)
    {
        mm=`0${mm}`;
    }
    if(hh<10)
    {
        hh=`0${hh}`;
    }
    if(m<10)
    {
        m=`0${m}`;
    }    
    if(format === 'mm-dd-yyyy'){
        newDate = `${mm}-${dd}-${yyyy}`;
    }
    if(format === 'mm/dd/yyyy'){
        newDate = `${mm}/${dd}/${yyyy}`;
    }
    if(format === 'dd/mm/yyyy'){
        newDate = `${dd}/${mm}/${yyyy}`;
    }
    if(format === 'd/m/yy'){
        newDate = `${dd}/${mm}/${yy}`;
    }
    if(format === 'dd-mm-yyyy'){
        newDate = `${dd}-${mm}-${yyyy}`;
    }
    if(format === 'yyyy-mm-dd'){
        newDate = `${yyyy}-${mm}-${dd}`;
    }
    if(format === 'yyyy-mm-dd-tt'){
        newDate = `${yyyy}-${mm}-${dd} ${hh}:${m}`;
    }
    
    
    return newDate;
}
const convertDateFormat = (date,fromFormat,toFormat) => {
    let newDate = '';
    let splitdate = date.split("/");
    if(fromFormat === 'dd/mm/yy' && toFormat === 'mm/dd/yy')
    {
        newDate = `${splitdate[1]}/${splitdate[0]}/${splitdate[2]}`;
    }
    
    return newDate;
}

const formatYear = (date) => {
    let currentYear = new Date().getFullYear();
    let splitdate = date.split("/");
    return `${splitdate[0]}/${splitdate[1]}/${currentYear}`;
    //console.log(currentYear)
}

const useFormatDate = () => {
    return {formatDate,convertDateFormat,formatYear}
}

export default useFormatDate

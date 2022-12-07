//import {ref} from "vue";

const checkElevenAm = () => {
    let date = new Date();
    let hh = date.getHours();
    
    if(hh < 11)
    {
        return true;
    }
    return false;    
}
const createNewCustomDate = (day) => {
    let date = new Date();
    date.setDate(date.getDate() + day );
    return date;
}
const useHelper = () => {
    return {checkElevenAm, createNewCustomDate}
}

export default useHelper

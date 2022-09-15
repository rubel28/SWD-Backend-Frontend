import {ref} from "vue";

const is_submit_form = ref(false);
const validation = (validateData) => {
        let isAllValid = false;
        //console.log(validateData)
        Object.keys(validateData.value).every(key => {
            if(validateData.value[key]){
                isAllValid = true;
            }else {
                isAllValid = false;
                return false;
            }
            return true;
        });
        if(isAllValid){
            return true;
        }else {
            return false;
        }
}
const email_validate = (email) => {
    const regexp = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regexp.test(email);
};

const useValidation = () => {
    return {validation,email_validate,is_submit_form}
}

export default useValidation

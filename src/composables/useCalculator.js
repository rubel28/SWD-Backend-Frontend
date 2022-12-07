import {ref} from "vue";

const calculator = (type,value1,value2) => {
    let result = ref(0);
    if (type === 'percent') {
        result = ((value1 / value2) - 1) * 100;
    }
    if (type === 'rate') {
        result = ((value1 / 100) + 1) * value2;
    }
    return result;
}

const useCalculator = () => {
    return {calculator}
}

export default useCalculator

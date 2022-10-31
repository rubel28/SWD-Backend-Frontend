<template>
    <div class="form-group">
        <label :id="labelId" :for="id">{{label}}</label>
        <select
            v-bind="$attrs"
            @change="emits('change')"
            :id="id"
            ref="root"
            :value="modelValue"
            @input="emits('update:modelValue', $event.target.value)"
            class="form-select"
            :class="[ requiredField ? (isSubmitForm ? ( modelValue ? 'is-valid' : 'is-invalid') : '') : '']"
        >
            <option value="" disabled>Select {{requiredField ? label + ' *': label}}</option>
            <option v-for="(name, value) in options" :key="value" :value="value">{{ name }}</option>
        </select>
        <div v-if="requiredField" class="valid-feedback">Looks good!</div>
        <div v-if="requiredField" class="invalid-feedback"> Please Select {{label}} </div>
    </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    label:{
        type:String,
        default:""
    },
    id:{
        type:String,
        default:""
    },
    labelId:{
        type:String,
        default:""
    },
    modelValue: {
        type:[String,Number],
        default:""
    },
    requiredField: {
        type:Boolean,
        default:false
    },
    isSubmitForm: {
        type:Boolean,
        default:false
    },
    options: {
        type:Object,
    },
    
});

const emits = defineEmits(["update:modelValue","change"]);
const root = ref(null);


const focus = () => root.value.focus();
defineExpose({focus})
</script>

<template>
    <div class="form-group">
        <label :id="labelId" :for="id">{{label}}</label>
        <input
            v-bind="$attrs"
            :id="id"
            ref="root"
            :value="modelValue"
            @input="emits('update:modelValue', $event.target.value)"
            class="form-control"
            :placeholder="placeholder"
            :class="[ requiredField ? (isSubmitForm ? ((modelValue && isValidEmail) ? 'is-valid' : 'is-invalid') : '') : (isSubmitForm && modelValue) ? (isValidEmail ? 'is-valid' : 'is-invalid'):'']"
        />
        <div :v-if="!isValidEmail" class="valid-feedback">Looks good!</div>
        <div :v-if="!isValidEmail" class="invalid-feedback"> Please enter a valid {{label}} </div>
    </div>
</template>

<script setup>
import {ref,computed} from "vue";

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
    placeholder: {
        type:String,
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
    isValidEmail: {
        type:Boolean,
        default:false
    },
    
});

const emits = defineEmits(["update:modelValue"]);
const root = ref(null);

const focus = () => root.value.focus();
defineExpose({focus})
</script>

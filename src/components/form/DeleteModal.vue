<template>
    <div :id="modalId" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Delete</h5>
<!--                    <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>-->
                </div>
                <div class="modal-body">
                    <div class="compose-box">
                        <div class="compose-content">
                            <form>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label id="enter_pin" for="pin">Enter pin to confirm</label>
                                            <input
                                                type="password"
                                                id="Pin"
                                                ref="root"
                                                class="form-control"
                                                placeholder="Pin *"
                                                v-model="deleteParams.pin"
                                                required
                                            />
                                        </div>                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal" @click="emits('resetForm')">Discard</button>
                    <button v-if="loadingSubmitted" disabled type="button" class="btn btn-danger">
                        <SvgIcon icon="feather-loader"></SvgIcon>
                        Deleting
                    </button>
                    <button v-else type="submit" class="btn btn-danger" @click="emits('deleteSubmit')">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import TInput from '@/components/form/core/BaseInput.vue';

const props = defineProps({
    modalId:{
        type:String,
        required:true,
        default:""
    },
    deleteParams: {
        type:Object,
    },
    loadingSubmitted: {
        type:Boolean,
        default:false
    },
    
});

const emits = defineEmits(["deleteSubmit","resetForm"]);
const root = ref(null);

const focus = () => root.value.focus();
defineExpose({focus});

//const is_submit_form = ref(false);
</script>

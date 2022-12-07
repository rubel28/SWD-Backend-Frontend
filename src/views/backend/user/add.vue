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
                                <li class="breadcrumb-item"><a href="/users">Users</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>New User</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="account-settings-container layout-top-spacing">
            <form @submit.prevent="submit_form">
                <div class="account-content">
                    <div class="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                                <div class="section general-info">
                                    <div class="info">
                                        <h5 class="">Login Information</h5>
                                        <div class="row">
                                            <div class="col-md-11 mx-auto">
                                                <div class="row">                                                   
    
                                                    <!-- Name -->
                                                    <div class="col-md-6">
                                                        <TInput
                                                            id="full_name"
                                                            label="Name"
                                                            placeholder="Name *"
                                                            ref="name"
                                                            label-id="name"
                                                            type="text"
                                                            :required-field="true"
                                                            v-model="form.name"
                                                            :is-submit-form="is_submit_form"
                                                        />
                                                    </div>
                                                    <!--/ Name -->                                                   
    
                                                    <!-- Email -->
                                                    <div class="col-md-6">
                                                        <BaseEmailInput
                                                            id="e_mail"
                                                            label="Email Address"
                                                            placeholder="Email Address *"
                                                            ref="email"
                                                            label-id="email"
                                                            type="email"
                                                            :required-field="true"
                                                            v-model="form.email"
                                                            :is-submit-form ="is_submit_form"
                                                            :is-valid-email ="email_validate(form.email)"
                                                        />
                                                    </div>
                                                    <!--/ Email -->

                                                    <!-- Mobile Number -->
                                                    <div class="col-md-5">
<!--                                                        <TInput
                                                            id="mobile"
                                                            label="Mobile Number"
                                                            placeholder="Mobile Number *"
                                                            ref="mobile_number"
                                                            label-id="mobile_number"
                                                            type="text"
                                                            :required-field="true"
                                                            v-model="form.mobile_number"
                                                            :is-submit-form="is_submit_form"
                                                        />-->
                                                        <div class="">
                                                            <label id="mobile_number" for="mobile">Mobile Number</label>
                                                            <div class="form-group input-group mb-4">
                                                                <input
                                                                    id="mobile"
                                                                    type="text" 
                                                                    class="form-control" 
                                                                    placeholder="Mobile Number *" 
                                                                    aria-label="Mobile Number"
                                                                    ref="mobile_number"
                                                                    v-maska="'#############'"
                                                                    v-model="form.mobile_number"
                                                                    :class="[ (is_submit_form ? ( form.mobile_number ? 'is-valid' : 'is-invalid') : '') ]"
                                                                />
                                                                <button v-if="loadingOtpSubmitted" disabled type="button" class="btn btn-primary">
                                                                    <SvgIcon icon="feather-loader"></SvgIcon>
                                                                    Sending
                                                                </button>
                                                                <button v-else class="btn btn-primary" type="button" @click="send_otp()">Send Code</button>
                                                            
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback"> Please fill the Mobile Number </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <!-- OTP -->
                                                    <div class="col-md-3">
                                                        <TInput
                                                            id="otp"
                                                            label="OTP Code"
                                                            placeholder="------"
                                                            ref="otp_token"
                                                            label-id="otp_token"
                                                            type="text"
                                                            v-maska="'######'"
                                                            :required-field="true"
                                                            v-model="form.otp_token"
                                                            :is-submit-form="is_submit_form"
                                                        />
                                                    </div>
                                                    <!--/ OTP -->
                                                    
                                                    <!--/ Mobile Number -->
    
                                                    <!-- Role -->
                                                    <div class="col-md-4">
                                                        <BaseSelect
                                                            id="user_role"
                                                            label="User Role"
                                                            ref="roles"
                                                            label-id="roles"
                                                            :required-field="true"
                                                            v-model="form.roles"
                                                            :options="options"
                                                            :is-submit-form="is_submit_form"
                                                        />
                                                    </div>
                                                    <!--/ Role -->   
                                                    
                                                </div>
                                                <div v-if="timerShow" class="alert alert-light-primary alert-dismissible border-0 mb-4" role="alert">
                                                    Wait <strong>{{ expireTime }}</strong> second to resend OTP.
<!--                                                    <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close"></button>-->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-settings-footer">
                    <div class="as-footer-container">
                        <button type="button" class="btn btn-danger" @click="handle_cancel()">Cancel</button>
                        <button v-if="loadingRegSubmitted" disabled type="button" class="btn btn-primary">
                            <SvgIcon icon="feather-loader"></SvgIcon>
                            Saving...
                        </button>
                        <button v-else type="submit" class="btn btn-success">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style>

</style>

<script setup>
import {computed, nextTick, onMounted, ref} from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/users/user-account.scss';
    import feather from 'feather-icons';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import TInput from '@/components/form/core/BaseInput.vue';
    import BaseEmailInput from '@/components/form/core/BaseEmailInput.vue';
    import BaseSelect from '@/components/form/core/BaseSelect.vue';
    import { useStore } from 'vuex';

    import { useMeta } from '@/composables/use-meta';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";
    import { useRouter } from 'vue-router';

    useMeta({ title: 'New User' });
    const router = useRouter();
    const store = useStore();
    /* Import composable file */
    const { validation,email_validate, field_name } = useValidation();
    const { showMessage,showArrayMessage } = useShowMessage();
    /* end */


    /* form data for v-model */
    const form = ref({
        name: '',email:'', mobile_number: '',roles:'',otp_token:''
    });
    const options = ref([]);
    const timer = ref(null);
    const expireTime = ref(null);
    const timerShow = ref(false);
    /* end */

    /* For Required Field Validation*/
    const is_submit_form = ref(false);
    const name = ref(null);
    const mobile_number = ref(null);
    const email = ref(null);
    const otp_token = ref(null);
    const validateData = ref({ name: '',email:'',mobile_number: '',otp_token:'',roles:''})
    /* End */

    /* set loader to state */
    const loadingOtpSubmitted = computed(() =>  store.state.registration.otp.loading);
    const loadingRegSubmitted = computed(() =>  store.state.registration.registration.loading);
    /* Mounted hook */
    onMounted(() => {
        feather.replace();
        clear_form();
        getRoleData();
        
    })

    /* get role data */
    function getRoleData() {
        store.dispatch('role/getRoles').then(() => {
            options.value = store.getters['role/roles'];
        });
    }
    /* Custom validation functions */
    function handle_validation_error() {
        //let labelText = `${document.getElementById(field_name.value[0]).innerText} is required.`;
        nextTick(() => {
            //scroll to the first error
            let elementsInErrors = document.getElementsByClassName('is-invalid');
            if (elementsInErrors && elementsInErrors.length > 0) {
                elementsInErrors[0].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
        //showMessage(labelText, 'error');// type => success/error
    }
    function setFieldValidation() {
        is_submit_form.value = true;
        validateData.value.name = form.value.name;
        validateData.value.email = form.value.email;
        validateData.value.mobile_number = form.value.mobile_number;
        validateData.value.otp_token = form.value.otp_token;
        validateData.value.roles = form.value.roles;
        
    }
    /* end */

    // Save/Update data to database
    const submit_form = () => {
        //console.log(form.value);
        setFieldValidation();
        if (validation(validateData)) {
            //form validated success
            store.dispatch('registration/saveRegistration',{...form.value}).then(({data}) => {
                store.commit('registration/setRegistrationLoading', false);
                //console.log(data.message.mobile_number[0]);
                if(typeof data.status !== 'undefined' && data.status !== true){
                    showArrayMessage(data.message,'error');// type => success/error
                }
                else if(typeof data.success !== 'undefined' && data.success === true){
                    clear_form();
                    showMessage(data.message,'success');// type => success/error
                }else{
                    showMessage(data.message,'error');// type => success/error
                }

            }).catch((err) => {
                store.commit('registration/setRegistrationLoading', false);
                //error.value = `${err.data.message}`;
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            //console.log(field_name.value[0].value);
            //eval(field_name.value[0]).value?.focus();
            handle_validation_error();
        }
    };

    /* Send otp */
    function send_otp(){
        if (form.value.mobile_number) {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let otpParams = { 
                mobile_number: form.value.mobile_number,
                time_zone: timezone,
            }
            store.dispatch('registration/sendOtp',{...otpParams}).then(({data}) => {
                store.commit('registration/setOtpLoading', false);
                //console.log(data.message.mobile_number[0]);
                if(typeof data.status !== 'undefined' && data.status !== true){
                    //console.log(data.message);
                    /*let message = {
                        country_name: ["Country Name is required!"],
                        country_latitude: ["The country latitude field is required!"],
                        country_logo: ["The country logo/image field is required!"]
                    }*/
                    showArrayMessage(data.message,'error');// type => success/error
                }
                else if(typeof data.success !== 'undefined' && data.success === true){
                    form.value.otp_token = store.state.registration.otp.data.otp;
                    clearInterval(timer.value);
                    set_timer();
                }else{
                    showMessage(data.message,'error');// type => success/error
                }
    
            }).catch((err) => {
                store.commit('registration/setOtpLoading', false);
                //error.value = `${err.data.message}`;
                showMessage('Something went really wrong!','error');// type => success/error
            });
        }else {
            mobile_number.value.focus();
            showMessage('Enter mobile number!','error');// type => success/error
        }
    }

    const set_timer = () => {
        let countDownDate = new Date(store.state.registration.otp.data.expire_at).getTime();
        timerShow.value = true;
        timer.value = setInterval(() => {
            let now = new Date().getTime();

            let distance = countDownDate - now;
            if(distance > 0){
                expireTime.value = Math.floor(distance / 1000);
            }
            //console.log(expireTime.value);    
            if (distance < 0) {
                timerShow.value = false;
                clearInterval(timer.value);
            }
        }, 1000);
    };
    
    /* Clear Form data */
    const clear_form = () => {
        form.value = {name: '',email:'', mobile_number: '',roles:'',otp_token:''};
    };
    
    
    /* Cancel*/
    const handle_cancel = () => {
        router.push({name:'users'});
    };

</script>

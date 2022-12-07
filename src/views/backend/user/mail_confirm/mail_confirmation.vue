<template>
    <div class="form full-form auth-cover">
        <div class="form-container">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">Congratulation!</h1>
                            <p class="signup-link">{{successMessage}}</p>
                            <form class="text-start">
                                <div class="form">                                    
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <button @click="handle_click" type="button" class="btn btn-primary">Click here to login</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <p class="terms-conditions">
                                © 2022 SWD RESEARCH PRIVATE LIMITED, All rights reserved.
                                <router-link :to="{name:'terms-privacy'}" target='_blank' >Terms & Privacy</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-image">
                <div class="l-image"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import '@/assets/sass/authentication/auth.scss';
    import { useRouter,useRoute} from "vue-router";
    import { useStore } from 'vuex';

    import { useMeta } from '@/composables/use-meta';
    import {onMounted,ref} from "vue";
    useMeta({ title: 'Mail confirmation' });
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    

    const successMessage = ref('You successfully confirmed your email address.')
    onMounted(() => {
        getVerifyMail();
    })
    
    const getVerifyMail = () => {
        if(route.params.token){
            store.dispatch('registration/getMailVerify',route.params.token).then(() => {
                //console.log(store.state.role.roles.data.roles);
                successMessage.value = store.state.registration.mailVerify.data.message;
            });
        }
        
    }
    function handle_click() {
        router.push({name:'Login'});
    }
</script>

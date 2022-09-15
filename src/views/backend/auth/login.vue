<template>
    <div class="form auth-boxed">
        <div class="form-container outer">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">SWD Admin Panel</h1>
                            <p class="">Log in to your account to continue.</p>
                            <div v-if="errorMsg" class="alert alert-light-danger alert-dismissible border-0 mb-4" role="alert">
                                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">×</button>
                                <div class="media">
                                    <div class="media-aside align-self-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-alert-triangle"
                                        >
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                            <line x1="12" y1="9" x2="12" y2="13"></line>
                                            <line x1="12" y1="17" x2="12" y2="17"></line>
                                        </svg>
                                    </div>
                                    <div class="media-body">
                                        <div class="alert-text ms-2"><strong>{{errorMsg}}</strong></div>
                                    </div>
                                </div>
                            </div>

                            <form class="text-start" @submit.prevent="handelSubmit">
                                <div class="form">
                                    <div id="username-field" class="field-wrapper input">
                                        <label for="username">USERNAME</label>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-user"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input id="username" type="text" class="form-control" placeholder="e.g 6500000000" v-model="form.mobile_number" required />
                                    </div>

                                    <div id="password-field" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">PASSWORD</label>
                                            <!--                                            <router-link to="/auth/pass-recovery-boxed" class="forgot-pass-link">Forgot Password?</router-link>-->
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-lock"
                                        >
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <input id="password" :type="pwd_type" class="form-control" placeholder="Password" v-model="form.password" required />
                                        <svg
                                            @click="set_pwd_type"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            id="toggle-password"
                                            class="feather feather-eye"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </div>
<!--                                    <div class="field-wrapper text-left keep-logged-in">
                                        <div class="checkbox-outline-primary custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" value="true" id="chkRemember" />
                                            <label class="custom-control-label" for="chkRemember">Keep me logged in</label>
                                        </div>
                                    </div>-->
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <button v-if="loadingSubmitted" disabled type="button" class="btn btn-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-loader spin me-2"
                                                >
                                                    <line x1="12" y1="2" x2="12" y2="6"></line>
                                                    <line x1="12" y1="18" x2="12" y2="22"></line>
                                                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                                    <line x1="2" y1="12" x2="6" y2="12"></line>
                                                    <line x1="18" y1="12" x2="22" y2="12"></line>
                                                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                                </svg>
                                                Sign in...
                                            </button>
                                            <button v-else
                                                    type="submit"
                                                    class="btn btn-primary">Sign In
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import '@/assets/sass/authentication/login.scss';
    import '@/assets/sass/components/custom-sweetalert.scss';
    import { computed, ref } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import useShowMessage from "@/composables/useShowMessage";

    useMeta({ title: 'Login' });
    const { showAlert } = useShowMessage();
    const pwd_type = ref('password');

    const set_pwd_type = () => {
        if (pwd_type.value === 'password') {
            pwd_type.value = 'text';
        } else {
            pwd_type.value = 'password';
        }
    }
    const router = useRouter()
    const store = useStore();
    const errorMsg = ref(null);
    const form = {
        mobile_number: '6501521209',
        password: 'abc123'
    }
    const loadingSubmitted = computed(() =>  store.state.login.loginSubmit.loading);
    function handelSubmit(ev){
        ev.preventDefault();
        errorMsg.value = null;
        store.dispatch('login/login',form)
            .then(async () => {
                store.commit('login/setLoginSubmitLoading', false);
                showAlert('Signed in successfully');
                await router.push({name:'Home'})
            })
            .catch((err) => {
                //console.log(err.data);
                errorMsg.value = null;
                store.commit('login/setLoginSubmitLoading', false);
                errorMsg.value = `${err.data.message}! ${err.data.data.error}`;
            })
    }

</script>

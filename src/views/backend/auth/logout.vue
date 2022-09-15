<template>
    <div class="layout-px-spacing">
<!--        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="javascript:">
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
                                            class="feather feather-home"
                                        >
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                    </a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Logout</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>-->

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-md-12 col-12 layout-spacing">
                <div class="panel br-4">
                    <div class="panel-body loader-panel-min-height">
                        <div class="d-flex justify-content-center mx-5 mt-3 mb-5">
                            <div class="spinner-border text-success align-self-center loader-lg">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/forms/switches.scss';

    import { useMeta } from '@/composables/use-meta';
    import { useRouter } from "vue-router";
    import useShowMessage from "@/composables/useShowMessage";

    useMeta({ title: 'Logout' });
    const { showAlert } = useShowMessage();
    const router = useRouter();
    
    onMounted( () => {
        router.push({name:'Login'});
    })

</script>

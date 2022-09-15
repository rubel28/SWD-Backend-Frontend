<template>
    <div class="layout-px-spacing">
        <div class="error404 text-center">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4 me-auto mt-5 text-md-start text-center">
                        <a href="index.html" class="ms-md-5">
                            <img alt="image-404" src="@/assets/images/logo2.svg" class="theme-logo" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="container-fluid error-content">
                <div class="">
                    <h1 class="error-number">404</h1>
                    <p class="mini-text">Ooops!</p>
                    <p class="error-text mb-4 mt-1">The page you requested was not found!</p>
                    <button @click="handleBack" class="btn btn-primary mt-5">Go Back</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import '@/assets/sass/pages/error/style-400.scss';

    import { useMeta } from '@/composables/use-meta';
    import { useRouter} from "vue-router";
    
    useMeta({ title: 'Error 404' });
    const router = useRouter();
    
    function handleBack() {
        router.go(-1);
    }
</script>

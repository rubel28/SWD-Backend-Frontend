<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Utility Settings</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Bank Preview</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row preview layout-top-spacing layout-spacing apps-preview">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="doc-container">
                    <div class="row">
                        <div class="col-xl-9">
                            <div class="preview-container">
                                <div class="preview-inbox">
                                    <div id="ct" class="">
                                        <div class="preview-00001">
                                            <div class="content-section">
                                                <div class="preview--head-section preview--detail-section">
                                                    <div class="row">
                                                        <div class="col-sm-6 col-12 me-auto">
                                                            <div class="d-flex">
                                                                <img class="company-logo" src="@/assets/images/logo.png" alt="company" />
                                                                <h3 class="in-heading align-self-center">SWD RESEARCH PRIVATE LIMITED</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="preview--detail-section preview--detail-section-body">
                                                    <div class="row">
                                                        <div class="col-xl-8 col-lg-7 col-md-6 col-sm-4 align-self-center">
                                                            <p class="inv-to">Bank Details</p>
                                                        </div>                                                       
                                                    </div>
                                                </div>

                                                <div class="preview--table-section">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th v-for="item in columns" :key="item">
                                                                        {{ item }}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item in items" :key="item.id">
                                                                    <td>
                                                                        {{ item.id }}
                                                                    </td>
                                                                    <td>
                                                                        <div class="d-flex">
                                                                            <div class="usr-img-frame me-2 rounded-circle">
                                                                                <img alt="avatar" class="img-fluid rounded-circle" :src="require('@/assets/images/flags/en.png')" />
                                                                            </div>
                                                                            <p class="align-self-center mb-0 admin-name">{{ item.name }}</p>  
                                                                        </div>
                                                                    </td>
                                                                    <td>{{ item.country_name }}</td>
                                                                    <td>{{ item.swift_code }}</td>
                                                                    <td >{{ item.status }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3">
                            <div class="preview-actions-btn">
                                <div class="preview-action-btn">
                                    <div class="row">                                        
                                        <div class="col-xl-12 col-md-3 col-sm-6">
                                            <a href="javascript:;" class="btn btn-secondary btn-print action-print" @click="print()">Print</a>
                                        </div>
                                        <div class="col-xl-12 col-md-3 col-sm-6">
                                            <router-link :to="{name:'bank'}" class="btn btn-danger btn-download">Back</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    //import '@/assets/sass/preview.scss';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Bank Preview' });

    const items = ref([]);
    const columns = ref([]);

    onMounted(() => {
        bind_data();
    });

    const bind_data = () => {
        columns.value = ['id','Name','Country','Swift Code','Status'];
        items.value = [
            { id: 1, name: 'IFIC Bank',country_name:'Bangladesh', swift_code: 223221, status: 'Active' },
        ];
    };

    const print = () => {
        window.print();
    };
</script>

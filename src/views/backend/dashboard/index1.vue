<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Internal Dashboard</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>
        <div class="row layout-top-spacing">
        <div id="tabsLine" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="statbox panel box box-shadow">
<!--            <div class="panel-heading">
                <div class="row">
                    <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                        <h4>Line</h4>
                    </div>
                </div>
            </div>-->
            <div class="panel-body underline-content tabs">
                <ul class="nav nav-tabs mb-3" id="lineTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="time-rates-tab" data-bs-toggle="tab" href="#time-rates" role="tab" aria-controls="time-rates" aria-selected="true">
                            11 am Rates
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="live-rates-tab" data-bs-toggle="tab" href="#live-rates" role="tab" aria-controls="live-rates" aria-selected="false">
                            Live Rates
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="historical-tab" data-bs-toggle="tab" href="#historical" role="tab" aria-controls="historical" aria-selected="false">
                            Historical
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="calculator-tab" data-bs-toggle="tab" href="#calculator" role="tab" aria-controls="calculator" aria-selected="false">
                            Calculator
                        </a>
                    </li>
                </ul>

                <div class="tab-content" id="lineTabContent">
                    <div class="tab-pane fade show active" id="time-rates" role="tabpanel" aria-labelledby="time-rates-tab">
                        <p class="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <div class="tab-pane fade" id="live-rates" role="tabpanel" aria-labelledby="live-rates-tab">
                        <div class="panel-body">
                            <div class="row">
                                <div class="row">
                                <div class="col-md-8">
                                    <apexchart v-if="options_1" height="300" type="line" :options="options_1" :series="series_1"></apexchart>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="historical" role="tabpanel" aria-labelledby="historical-tab">
                        <p class="dropcap dc-outline-primary">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div class="tab-pane fade" id="calculator" role="tabpanel" aria-labelledby="calculator-tab">
                        <p class="dropcap dc-outline-primary">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>                
            </div>
        </div>
            </div>
    </div>
    </div>
</template>

<script setup>
import { computed,ref } from 'vue';
import '@/assets/sass/scrollspyNav.scss';
import '@/assets/sass/components/custom-tabs.scss';

import apexchart from 'vue3-apexcharts';
import { useStore } from 'vuex';
import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'Internal Dashboard' });

const store = useStore();

//Simple Line
const series_1 = ref([{ name: 'Rates', data: [1, 1.1, 1.2, .9, 1.3, 1.5, 1.2, 1.4, 1.3, 1.5, 1.2] }]);
//Simple Line
const options_1 = computed(() => {
    const is_dark = store.state.is_dark_mode;
    return {
        chart: { toolbar: { show: false }, zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { curve: 'straight' },
        title: { text: 'Live Rates', align: 'left', style: { fontWeight: 'normal' } },
        grid: { row: { colors: [is_dark ? '#3b3f5c' : '#f1f2f3', 'transparent'], opacity: 0.5 }, borderColor: is_dark ? '#191e3a' : '#e0e6ed' },
        xaxis: { categories: ['11am','11.30am', '12pm', '12.30pm', '1pm', '1.30pm', '2pm', '2.30pm', '3pm', '3.30pm', '4pm'] },
        tooltip: { theme: is_dark ? 'dark' : 'light' },
    };
});
</script>

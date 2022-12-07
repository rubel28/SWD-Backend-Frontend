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
                <ul class="nav nav-tabs mb-2" id="lineTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="time-rates-tab" data-bs-toggle="tab" href="#time-rates" role="tab" aria-controls="time-rates" aria-selected="true">
                            11 am Rates
                        </a>
                    </li>
                    <li class="nav-item">
                        <a @click="loadLiveTab" class="nav-link" id="live-rates-tab" data-bs-toggle="tab" href="#live-rates" role="tab" aria-controls="live-rates" aria-selected="false">
                            Live Rates
                        </a>
                    </li>
                    <li class="nav-item">
                        <a @click="loadHistoricalTab" class="nav-link" id="historical-tab" data-bs-toggle="tab" href="#historical" role="tab" aria-controls="historical" aria-selected="false">
                            Historical
                        </a>
                    </li>
                    <li class="nav-item">
                        <a @click="loadCalculatorTab" class="nav-link" id="calculator-tab" data-bs-toggle="tab" href="#calculator" role="tab" aria-controls="calculator" aria-selected="false">
                            Calculator
                        </a>
                    </li>
                </ul>

                <div class="tab-content" id="lineTabContent">
                    <!-- 11 am tab -->
                    <div class="tab-pane fade show active pt-0" id="time-rates" role="tabpanel" aria-labelledby="time-rates-tab">
                        <div class="row search-bar-rate">
                            <div class="col-md-11 mt">
                                <div class="search">
                                    <form class="form-inline my-2 my-lg-0">
                                        <div class="">
                                            <SvgIcon icon="search" />
                                            <input type="text" v-model.trim="searchRate" class="input-search form-control" v-on:keyup="searchRates" placeholder="Search" />
                                        </div>
                                    </form>                                                                
                                </div>
                            </div>
                        </div>                        
                        <div class="row">
                            <div class="col-md-9 tableFixHead">
                                <div class="vl-parent">
                                    <Loading :active="loadingElevenAmTab"
                                             :can-cancel="loadingOption.canCancel"
                                             :color="loadingOption.color"
                                             :loader="loadingOption.loader"
                                             :width="loadingOption.width"
                                             :height="loadingOption.height"
                                             :backgroundColor="loadingOption.backgroundColor"
                                             :opacity="loadingOption.opacity"
                                             :is-full-page="loadingOption.fullPage" />
                                    <table class="table table-borderless table-sm text-center">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>USD</th>
                                        <th>SGD</th>
                                        <th>GBP</th>
                                        <th>EUR</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <th>
                                            <a class="add-btn" href="javascript:void(0);" @click="handleEdit()" title="Add currency" data-bs-toggle="tooltip" data-bs-placement="top">
                                                <SvgIcon icon="plus-circle-16"></SvgIcon>
                                            </a>&nbsp;
                                            <a class="remove-btn" href="javascript:void(0);" @click="handleRemove()" title="Remove currency" data-bs-toggle="tooltip" data-bs-placement="top">
                                                <SvgIcon icon="minus-circle-16"></SvgIcon>
                                            </a>
                                        </th>
                                        <th colspan="4"></th>
                                    </tr>
                                    </tfoot>                                    
                                    <tbody>
                                    <tr v-for="item in filteredItems" :key="item.currency">
                                        <td class="border-end">
                                            <div class="d-flex justify-content-center">
                                                <div v-if="isRemove" class="text-start" style="min-width: 50px">
                                                    <a class="remove-btn" href="javascript:void(0);" @click="deleteCurrency(item)" title="Remove currency" data-bs-toggle="tooltip" data-bs-placement="top">
                                                        <SvgIcon icon="minus-16"></SvgIcon>
                                                        {{ item.currency }}
                                                    </a>
                                                </div>
                                                <div v-else class="text-start" style="min-width: 50px">
                                                    {{ item.currency }}
                                                </div>
                                            </div>
                                        </td>
                                        <td class="border-end">{{ item.currency === 'USD' ? '-':item.USD }}</td>
                                        <td class="border-end">{{ item.currency === 'SGD' ? '-':item.SGD }}</td>
                                        <td class="border-end">{{ item.currency === 'GBP' ? '-':item.GBP }}</td>
                                        <td class="border-end">{{ item.currency === 'EUR' ? '-':item.EUR }}</td>
                                    </tr>
                                    </tbody>                                    
                                </table>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-9 text-center legend">
                                <span>+ - to add currency and remove currency pairs</span>
                            </div>
                        </div>
                        <!--Add Currency Modal-->
                        <div id="addCurrencyModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-sm modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header popup-search">
                                        <div class="search">
                                            <form class="form-inline my-2 my-lg-0">
                                                <div class="">
                                                    <SvgIcon icon="search" />
                                                    <input type="text" v-model.trim="searchCurrency" class="input-search form-control" v-on:keyup="searchCurrencies" placeholder="Search" />
                                                </div>
                                            </form>
                                        </div>
                                        <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                                    </div>
                                    <div class="modal-body modal-body-ptb">
                                        <div class="compose-box">
                                            <div class="compose-content">
                                                <form>
                                                    <div class="row">
                                                        <div class="col-12 popupTableFixHead">
                                                            <div class="table-checkable table-responsive">
                                                                <table role="table" aria-busy="false" aria-colcount="5" class="table b-table table-borderless table-hover" id="__BVID__368">
                                                                    <tbody role="rowgroup">
                                                                        <tr v-for="(item, i) in filteredCurrencies" :key="item.id + '' + i" role="row" class="">
                                                                            <td aria-colindex="2" role="cell" class="text-start">
                                                                                <div class="d-flex justify-content-start">
                                                                                    <div class="checkbox-primary custom-control custom-checkbox">
                                                                                        <input variant="primary" type="checkbox" v-model="addCParams.currency" class="custom-control-input" :id="`chk-${item.id}`" :value="item.id" />
                                                                                        <label class="custom-control-label" :for="`chk-${item.id}`">
                                                                                            {{ `${item.currency}` }}<small>{{`-${item.name}`}}</small>
                                                                                        </label>
                                                                                    </div>                                                                                
                                                                                </div>                                                                            
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>                                                        
                                                    </div>                                                    
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer justify-content-center">
<!--                                        <button v-if="loadingSubmitted" disabled type="button" class="btn btn-success">
                                            <SvgIcon icon="feather-loader"></SvgIcon>
                                            Adding...
                                        </button>-->
                                        <button v-if="buttonLoading" disabled type="button" class="btn btn-success">
                                            <SvgIcon icon="feather-loader" />
                                            Adding...
                                        </button>
                                        <button v-else type="submit" class="btn btn-success" @click="handle_save()">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--/ Add Currency Modal-->
                    </div>
                    <!--/ 11 am tab -->
                    
                    <!-- Live rate tab -->
                    <div class="tab-pane fade pt-0" id="live-rates" role="tabpanel" aria-labelledby="live-rates-tab">
                        <div class="row currency-pair">
                            <div class="col-12 col-xl-9 col-lg-9 col-md-9 d-flex justify-content-start justify-content-xl-end justify-content-lg-end justify-content-md-end ms-3">
                                <div class="form-group">
                                    <label for="liveFrom">From</label>
                                    <select v-model="lParams.from_country_iso" id="liveFrom" class="form-select form-select-sm">
                                        <option value="Default select" disabled>Select Currency</option>
                                        <option v-for="(name, value) in currencyOption" :key="value" :value="value">{{ name }}</option>
                                    </select>
                                </div>
                                <div class="mt-3 ms-2 me-2">
                                    <button @click="getLiveRates" type="button" title="Click to show graph" data-bs-toggle="tooltip" class="btn btn-sm btn-light-primary mt-1 pt-1 pb-1 ps-2 pe-2">
                                        <svg-icon icon="repeat" />
                                    </button>
                                </div>                                
                                <div class="form-group">
                                    <label for="liveTo">To</label>
                                    <select v-model="lParams.to_country_iso" id="liveTo" class="form-select form-select-sm">
                                        <option value="Default select" disabled>Select Currency</option>
                                        <option v-for="(name, value) in currencyOption" :key="value" :value="value">{{ name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-xl-9 col-lg-9 col-md-9 ms-3">
                                <div class="row">
                                    <div class="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <label>Graph for {{lCurrencyPair}}</label>
                                    </div>
                                    <div class="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div class="row">
                                                <label class="col-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 text-xl-end text-lg-end text-md-end pt-1 col-form-label pe-0" 
                                                       for="liveRate">Live Rate</label>
                                                <div class="col-5 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                    <input v-model="liveRate" type="text" id="liveRate" readonly class="form-control" placeholder="Live rate" />
                                                </div>
                                            </div>
                                    </div>                                    
                                </div>                                                               
                            </div>
                        </div>
                        <div class="panel-body pt-0">
                            <div class="vl-parent">
                                <Loading :active="loadingHistoricalTab"
                                         :can-cancel="loadingOption.canCancel"
                                         :color="loadingOption.color"
                                         :loader="loadingOption.loader"
                                         :width="loadingOption.width"
                                         :height="loadingOption.height"
                                         :backgroundColor="loadingOption.backgroundColor"
                                         :opacity="loadingOption.opacity"
                                         :is-full-page="loadingOption.fullPage" />
                                <div class="row live-calculator">
                                <div class="col-12 col-lg-9 col-xl-9 col-md-9 p-se">
                                    <apexchart v-if="optionsLive" height="300" type="line" :options="optionsLive" :series="seriesLive"></apexchart>
                                </div>
                                <div class="col-12 col-lg-3 col-xl-3 col-md-3">
                                    <div class="row border rounded p-3">
                                        <div class="col-12">
                                            <div class="d-flex justify-content-around">
                                                <small>11am Rate</small>
                                                <small>Live Rate</small>
                                            </div>
                                            <div class="input-group">                                                
                                                <input v-model="lEamRate" type="text" readonly class="form-control form-control-sm text-center" />
                                                <input v-model="lLiveRate" type="text" readonly class="form-control form-control-sm text-center" />
                                            </div>
                                        </div>
                                        <div class="col-12 text-center">
                                            <svg-icon icon="percent-16"/>
                                        </div>
                                        <div class="col-12 d-flex justify-content-center">
                                            <div class="w-50">
                                                <input v-model="lPercentage" type="text" readonly :title="lPercentage" class="form-control form-control-sm text-center" />
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!--/ Live rate tab -->
                    
                    <!-- Historical rate tab -->
                    <div class="tab-pane fade pt-0" id="historical" role="tabpanel" aria-labelledby="historical-tab">
                        <div class="row currency-pair">
                            <div class="col-12 col-xl-5 col-lg-5 col-md-5 d-flex justify-content-start justify-content-xl-end justify-content-lg-end justify-content-md-end ms-3 ms-xl-0 ms-lg-0 ms-md-0 ms-sm-0">
                                <div class="form-group">
                                    <label for="sDate">Start Time</label>
                                    <flat-pickr v-model="hParams.hrp_start_date_time" id="sDate"
                                                placeholder="Select Date"
                                                :config="{maxDate:'today', dateFormat: 'd/m/Y'}"
                                                class="form-control flatpickr active"
                                    >
                                    </flat-pickr>
                                </div>
                                <div class="form-group ms-4">
                                    <label for="eDate">End Time</label>
                                    <flat-pickr v-model="hParams.hrp_end_date_time" id="eDate"
                                                placeholder="Select Date"
                                                :config="{maxDate:'today', dateFormat: 'd/m/Y'}"
                                                class="form-control flatpickr active"
                                    >
                                    </flat-pickr>
                                </div>                                
                            </div>
                            <div class="col-12 col-xl-5 col-lg-5 col-md-5 d-flex justify-content-start ms-3">
                                <div class="form-group">
                                    <label for="from">From</label>
                                    <select v-model="hParams.from_country_iso" id="from" class="form-select form-select-sm">
                                        <option value="Default select" disabled>Select Currency</option>
                                        <option v-for="(name, value) in currencyOption" :key="value" :value="value">{{ name }}</option>
                                    </select>
                                </div>
                                <div class="mt-3 ms-2 me-2">
                                    <button @click="getHistoricalRates" type="button" title="Click to show graph" data-bs-toggle="tooltip" class="btn btn-sm btn-light-primary mt-1 pt-1 pb-1 ps-2 pe-2">
                                        <svg-icon icon="repeat" />
                                    </button>
                                </div>
                                <div class="form-group">
                                    <label for="to">To</label>
                                    <select v-model="hParams.to_country_iso" id="to" class="form-select form-select-sm">
                                        <option value="Default select" disabled>Select Currency</option>
                                        <option v-for="(name, value) in currencyOption" :key="value" :value="value">{{ name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-xl-9 col-lg-9 col-md-9 ms-3">
                                <label>Graph for {{hCurrencyPair}}</label>
                            </div>
                        </div>
                        <div class="panel-body pt-0">                                
                                <div class="vl-parent">
                                    <Loading :active="loadingHistoricalTab"
                                             :can-cancel="loadingOption.canCancel"
                                             :color="loadingOption.color"
                                             :loader="loadingOption.loader"
                                             :width="loadingOption.width"
                                             :height="loadingOption.height"
                                             :backgroundColor="loadingOption.backgroundColor"
                                             :opacity="loadingOption.opacity"
                                             :is-full-page="loadingOption.fullPage" />
                                    <div class="row">
                                        <div class="col-12 col-lg-9 col-xl-9 col-md-9 p-se">
                                            <apexchart v-if="optionsHistorical" height="300" type="line" :options="optionsHistorical" :series="seriesHistorical"></apexchart>
                                        </div>
                                        <div class="col-12 col-lg-3 col-xl-3 col-md-3 p-se">
                                            <table class="table table-bordered table-sm text-center">
                                                <thead>
                                                <tr>
                                                    <th class="text-capitalize">Date</th>
                                                    <th class="text-capitalize">11am Rates</th>
                                                </tr>
                                                </thead>                                       
        
                                                <tbody>
                                                <tr v-for="item in rates" :key="item.date">                                            
                                                    <td class="">{{ item.date }}</td>
                                                    <td class="">{{ item.rate }}</td>
                                                </tr>
                                                </tbody>
        
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--/ Historical rate tab -->
                    
                    <!-- Calculator tab -->
                    <div class="tab-pane fade pt-0" id="calculator" role="tabpanel" aria-labelledby="calculator-tab">
                        <div class="row currency-pair">
                            <div class="col-12 d-flex justify-content-start justify-content-xl-end justify-content-lg-end justify-content-md-end pe-4">
                                <div class="form-group">
                                    <label for="calFrom">From</label>
                                    <select v-model="cParams.from_country_iso" id="calFrom" class="form-select form-select-sm">
                                        <option value="Default select" disabled>Select Currency</option>
                                        <option v-for="(name, value) in currencyOption" :key="value" :value="value">{{ name }}</option>
                                    </select>
                                </div>
                                <div class="mt-3 ms-2 me-2">
                                    <button @click="getCalculatorRate" type="button" title="Click to show rate" data-bs-toggle="tooltip" class="btn btn-sm btn-light-primary mt-1 pt-1 pb-1 ps-2 pe-2">
                                        <svg-icon icon="repeat" />
                                    </button>
                                </div>
                                <div class="form-group">
                                    <label for="calTo">To</label>
                                    <select v-model="cParams.to_country_iso" id="calTo" class="form-select form-select-sm">
                                        <option value="Default select" disabled>Select Currency</option>
                                        <option v-for="(name, value) in currencyOption" :key="value" :value="value">{{ name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 text-center mb-3">
                                <label>Rate and Percentage Calculator {{cCurrencyPair}}</label>
                            </div>
                        </div>
                        <div class="panel-body pt-0">
                            <div class="vl-parent">
                                <Loading :active="loadingHistoricalTab"
                                         :can-cancel="loadingOption.canCancel"
                                         :color="loadingOption.color"
                                         :loader="loadingOption.loader"
                                         :width="loadingOption.width"
                                         :height="loadingOption.height"
                                         :backgroundColor="loadingOption.backgroundColor"
                                         :opacity="loadingOption.opacity"
                                         :is-full-page="loadingOption.fullPage" />
                                <div class="row">
                                <div class="calculator col-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="row border rounded pt-3 pb-3 ps-xl-3 ps-lg-3 ps-md-3 ps-sm-3 pe-xl-3 pe-lg-3 pe-md-3 pe-sm-3 me-xl-1 me-lg-1 me-md-1 me-sm-1 mb-3">
                                        <div class="col-5 col-xl-4 col-lg-4 col-md-4 col-sm-4 d-flex align-items-center">
                                            <label>Rate Input</label>
                                        </div>
                                        <div class="col-7 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                                            <div class="row">
                                                <div class="col-12 d-flex justify-content-center">
                                                    <div class="w-75">
                                                        <input v-model="inputRate" type="text" v-on:keyup="setInputRate" class="form-control form-control-sm text-center" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-2 d-flex align-items-center pt-5">
                                            <label>Rate</label>
                                        </div>
                                        <div class="col-10 pt-3">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="row calculator-sub">
                                                        <div class="col-6 d-flex justify-content-center mb-1">
                                                                <div class="me-1">
                                                                    <label>11am</label>
                                                                </div>
                                                                <div>
                                                                    <flat-pickr v-model="cParams.calRateDate" id=""
                                                                                placeholder="Select Date"
                                                                                :config="{maxDate:'today',dateFormat: 'd/m/y',static: true}"
                                                                                @on-change="onChangeDateForRate"
                                                                                class="form-control flatpickr active"
                                                                    >
                                                                    </flat-pickr>
                                                                </div>
                                                        </div>
                                                        <div class="col-6 text-center">
                                                            <label>Live</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12 d-flex justify-content-between">
                                                    <div class="me-2">
                                                        <input v-model="cPercentElevenAmRate" type="text" readonly class="form-control form-control-sm text-center" />
                                                    </div>
                                                    <div class="">
                                                        <input v-model="cLiveRate" type="text" readonly class="form-control form-control-sm text-center" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-2 d-flex align-items-center pt-3">
                                            <label>%</label>
                                        </div>
                                        <div class="col-10 pt-3">
                                            <div class="row">
                                                <div class="col-12 d-flex justify-content-between">
                                                    <div class="me-2">
                                                        <input v-model="cElevenAmPercentage" type="text" readonly :title="cElevenAmPercentage" data-bs-toggle="tooltip" class="form-control form-control-sm text-center" />
                                                    </div>
                                                    <div class="">
                                                        <input v-model="cLivePercentage" type="text" readonly :title="cLivePercentage" data-bs-toggle="tooltip" class="form-control form-control-sm text-center" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="calculator col-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="row border rounded p-3 ms-xl-1 ms-lg-1 ms-md-1 ms-sm-1">
                                        <div class="col-5 col-xl-4 col-lg-4 col-md-4 col-sm-4 d-flex align-items-center">
                                            <label>% Input</label>
                                        </div>
                                        <div class="col-7 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                                            <div class="row">
                                                <div class="col-12 d-flex justify-content-center">
                                                    <div class="w-75">
                                                        <input v-model="inputPercent" type="text" v-on:keyup="setInputPercent" class="form-control form-control-sm text-center" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3 d-flex align-items-center pt-5 ps-0 pe-0">
                                            <label>Rate</label>
                                        </div>
                                        <div class="col-9 pt-3 ps-0 pe-0">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="row calculator-sub">
                                                        <div class="col-6 d-flex justify-content-center mb-1">
                                                            <div class="me-1">
                                                                <label>11am</label>
                                                            </div>
                                                            <div>
                                                                <flat-pickr v-model="cParams.calPerDate"
                                                                            placeholder="Select Date"
                                                                            :config="{maxDate:'today',dateFormat: 'd/m/y',static:true}"
                                                                            @on-change="onChangeDateForPercent"
                                                                            class="form-control flatpickr active"
                                                                >
                                                                </flat-pickr>
                                                            </div>
                                                        </div>
                                                        <div class="col-6 text-center">
                                                            <label>Live</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12 d-flex justify-content-between">
                                                    <div class="me-2">
                                                        <input v-model="cRateElevenAmRate" type="text" readonly class="form-control form-control-sm text-center" />
                                                    </div>
                                                    <div class="">
                                                        <input v-model="cLiveRate" type="text" readonly class="form-control form-control-sm text-center" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3 d-flex align-items-center pt-3 ps-0 pe-0">
                                            <label>New Rate</label>
                                        </div>
                                        <div class="col-9 pt-3 ps-0 pe-0">
                                            <div class="row">
                                                <div class="col-12 d-flex justify-content-between">
                                                    <div class="me-2">
                                                        <input v-model="cElevenAmNewRate" type="text" readonly :title="cElevenAmNewRate" data-bs-toggle="tooltip" class="form-control form-control-sm text-center" />
                                                    </div>
                                                    <div class="">
                                                        <input v-model="cLiveNewRate" type="text" readonly :title="cLiveNewRate" data-bs-toggle="tooltip" class="form-control form-control-sm text-center" />
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
                    <!--/ Calculator tab -->
                </div>                
            </div>
        </div>
            </div>
    </div>
    </div>
</template>
<style>
.modal-content .modal-footer button.btn {
    padding: 0.4375rem 1.25rem !important;
}
</style>
<script setup>
import {computed, onMounted, ref} from 'vue';
import '@/assets/sass/scrollspyNav.scss';
import '@/assets/sass/components/custom-tabs.scss';
import '@/assets/sass/dashboard/internal-dashboard.scss';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import useCalculator from "@/composables/useCalculator";
import useFormatDate from "@/composables/useFormatDate";
//flatpickr
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import '@/assets/sass/forms/custom-flatpickr.css';
import apexchart from 'vue3-apexcharts';

import { useStore } from 'vuex';
import { useMeta } from '@/composables/use-meta';
import useValidation from "@/composables/useValidation";
useMeta({ title: 'Internal Dashboard' });

const store = useStore();
const { calculator } = useCalculator();
const { formatDate } = useFormatDate();

const items = ref([]);
const filteredItems = ref([]);
const filteredCurrencies = ref([]);
const rates = ref([]);
const isRemove = ref(false);
let addCurrencyModal = ref(null);
let searchRate = ref('');
let searchCurrency = ref('');
const liveRate = ref(0.9990);
const addCParams = ref({
    currency:[],
});
//const currencyPairList = ref([]);

//Simple Line
const seriesLiveValue = computed(() => store.getters['xeRate/liveSeries']);
const seriesHistoricalValue = computed(() => store.getters['xeRate/historicalSeries']);
//const label_value_historical = computed(() => store.state.xeRate.historicalRate.labels);
const seriesLive = ref([{ name: 'Rates', data: seriesLiveValue }]);
const seriesHistorical = ref([{ name: 'Rates', data: seriesHistoricalValue }]);

//Graph option Simple Line
const optionsLive = computed(() => {
    const is_dark = store.state.is_dark_mode;
    return {
        chart: { toolbar: { show: false }, zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { show: true, curve: 'straight', width: 2, lineCap: 'square' },
        /*title: { text: `Live Rates: ${liveRate.value}`, align: 'left', style: { fontWeight: 'normal' } },*/
        labels: store.getters['xeRate/liveLabels'],
        grid: {
            borderColor: is_dark ? '#191e3a' : '#e0e6ed',
            strokeDashArray: 5,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            padding: { top: 0, right: 0, bottom: 0, left: 0 }, 
        },
        xaxis: {
            show: true,
            axisBorder: { show: false },
            axisTicks: { show: false },
            /*crosshairs: { show: true },*/
            labels: { offsetX: 0, offsetY: 5, style: { fontSize: '12px', fontFamily: 'Nunito, sans-serif', cssClass: 'apexcharts-xaxis-title' } },
            /*categories: ['11am','11.30am', '12pm', '12.30pm', '1pm', '1.30pm', '2pm', '2.30pm', '3pm', '3.30pm', '4pm']*/
        },
        yaxis: { 
            /*min: 0,*/
            show: true,
            /*tickAmount: 7,*/
            labels: {
                offsetX: -10,
                offsetY: 0,
                style: { fontSize: '12px', fontFamily: 'Nunito, sans-serif', cssClass: 'apexcharts-yaxis-title' },
            },
            
        },
        tooltip: { x: { show: true },theme: is_dark ? 'dark' : 'light' },
    };
});
const optionsHistorical = computed(() => {
    //console.log(store.state.xeRate.historicalRate.labels);
    const is_dark = store.state.is_dark_mode;
    return {
        chart: { toolbar: { show: false }, zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { show: true, curve: 'straight', width: 2, lineCap: 'square' },
        /*title: { text: `Live Rates: ${liveRate.value}`, align: 'left', style: { fontWeight: 'normal' } },*/
        labels: store.getters['xeRate/historicalLabels'],
        grid: {
            borderColor: is_dark ? '#191e3a' : '#e0e6ed',
            strokeDashArray: 5,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
        },
        xaxis: {
            show: true,
            axisBorder: { show: true },
            axisTicks: { show: true },
            /*crosshairs: { show: false },*/
            labels: { offsetX: 0, offsetY: 0, style: { fontSize: '12px', fontFamily: 'Nunito, sans-serif', cssClass: 'apexcharts-xaxis-title' } },
            /*categories: ['11am','11.30am', '12pm', '12.30pm', '1pm', '1.30pm', '2pm', '2.30pm', '3pm', '3.30pm', '4pm'] */
        },
        yaxis: {
            /*min: 0,*/
            show: true,
            axisBorder: { show: true },
            /*tickAmount: 7,*/
            labels: {
                offsetX: -13,
                offsetY: 0,
                style: { fontSize: '12px', fontFamily: 'Nunito, sans-serif', cssClass: 'apexcharts-yaxis-title' },
            },           
        },        
        tooltip: { x: { show: true },theme: is_dark ? 'dark' : 'light' },
    };
});
/* set loader to state */
const loadingOption = ref({
    fullPage: false,
    canCancel: false, // default false
    onCancel: null,
    color: '#007BFF',
    loader: 'dots',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999,
});


const currencyOption = computed(() => {
    return store.getters['country/currencyList'];
})

onMounted(() => {        
    bindData();
    initPopup();
    setInputRate();
    setInputPercent();
})
/* Add Currency Modal init */
const initPopup = () => {
    addCurrencyModal = new window.bootstrap.Modal(document.getElementById('addCurrencyModal'));
};
const bindData = () => {
    store.dispatch('xeRate/getElevenAmDate');
    getElevenAmRate();
}
// 11 am rate Tab
const loadingElevenAmTab = computed(() => store.getters['xeRate/loadingElevenAmTab']);
const buttonLoading = computed(() => store.getters['xeRate/buttonLoading']);
const currencyPairList = computed(() => store.getters['country/currencyListForElevenAmCurrencyAdd']);
const getElevenAmRate = () => {
    store.dispatch('xeRate/getElevenAmRate').then(() => {
        items.value = store.getters['xeRate/elevenAmRate'];
        searchCurrencies();
        searchRates();
        store.commit('xeRate/setElevenAmRateLoading', false);
    });
}
const searchRates = () => {
    filteredItems.value = items.value.filter(
        (d) => (d.currency && (d.currency.includes(searchRate.value) || d.currency.toLowerCase().includes(searchRate.value)))
    );
};
const searchCurrencies = () => {
    filteredCurrencies.value = currencyPairList.value.filter(
        (d) => (d.currency && (d.currency.includes(searchCurrency.value) || d.currency.toLowerCase().includes(searchCurrency.value)))
    );
};

/* open modal in add and edit mode */
const handleEdit = () => {
    addCurrencyModal.show();
};

const handleRemove = () => {
    isRemove.value = !isRemove.value;
};
const deleteCurrency = (item) => {
    store.dispatch('xeRate/removeElevenAmCurrency',item.currency).then((res) => {
        if(res){
            items.value = items.value.filter((d) => d.currency != item.currency);
            searchRates();
            searchCurrencies();
        }
    });    
};
const handle_save = () => {
    store.dispatch('xeRate/saveElevenAmCurrency',{...addCParams.value}).then((res) => {
        if(res){
            clear_selection();
            addCurrencyModal.hide();
            getElevenAmRate();
        }        
    });
}
const clear_selection = () => {
    addCParams.value.currency = [];
};
// End 11 am rate Tab

// Historical Rate tab
const hParams = ref({
    hrp_start_date_time: formatDate(new Date().fp_incr(-7),'dd/mm/yyyy'),
    hrp_end_date_time: formatDate(new Date().fp_incr(0),'dd/mm/yyyy'),
    from_country_iso: '',
    to_country_iso: '',
});
const loadingHistoricalTab = computed(() => store.getters['xeRate/loadingHistoricalTab']);
const hCurrencyPair = computed(() => store.getters['xeRate/hCurrencyPair']);
const loadHistoricalTab = () => {
    hParams.value.from_country_iso = store.getters['xeRate/hFromCurrency'];
    hParams.value.to_country_iso = store.getters['xeRate/hToCurrency'];
    getHistoricalRates();
}
const getHistoricalRates = () => {
    store.dispatch('xeRate/getHistoricalRate',{...hParams.value}).then(() => {
        rates.value = store.getters['xeRate/historicalRate'];
        //console.log(loadingHistoricalTab.value);
        //store.commit('xeRate/setHistoricalRateLoading', false);
    });
    //console.log(hParams.value);
}

// Live Rate tab
const lParams = ref({
    from_country_iso: '',
    to_country_iso: '',
});
const lCurrencyPair = computed(() => store.getters['xeRate/lCurrencyPair']);
const lEamRate = computed(() => store.getters['xeRate/lElevenAmRate']);
const lLiveRate = computed(() => store.getters['xeRate/lLiveRate']);
const lPercentage = computed(() => store.getters['xeRate/calculateLiveTabPercentage']);
const loadLiveTab = () => {
    lParams.value.from_country_iso = store.getters['xeRate/lFromCurrency'];
    lParams.value.to_country_iso = store.getters['xeRate/lToCurrency'];
    getLiveRates();
}
const getLiveRates = () => {
    store.dispatch('xeRate/getLiveRate',{...lParams.value}).then(() => {
        //console.log(lEamRate.value);
        //rates.value = store.state.xeRate.historicalRate.data;
        //console.log(store.state.xeRate.historicalRate.labels);
        //store.commit('xeRate/setElevenAmRateLoading', false);
    });
}
// End Live Rate Tab

// Start Calculator Tab
const cParams = ref({
    calRateDate: '',
    calPerDate: '',
    from_country_iso: '',
    to_country_iso: '',
});
const cCurrencyPair = computed(() => store.getters['xeRate/cCurrencyPair']);
const cPercentElevenAmRate = computed(() => store.getters['xeRate/cpElevenAmRate']);
const cRateElevenAmRate = computed(() => store.getters['xeRate/crElevenAmRate']);
const cLiveRate = computed(() => store.getters['xeRate/cLiveRate']);
const cElevenAmPercentage = computed(() => store.getters['xeRate/calculateElevenAmPercentage']);
const cLivePercentage = computed(() => store.getters['xeRate/calculateLivePercentage']);
const cElevenAmNewRate = computed(() => store.getters['xeRate/calculateElevenAmNewRate']);
const cLiveNewRate = computed(() => store.getters['xeRate/calculateLiveNewRate']);
const isCallOnChangeEvent = computed(() => store.getters['xeRate/isCallOnChangeEvent']);

const loadCalculatorTab = () => {
    //console.log(store.getters['xeRate/elevenAmDate']);
    cParams.value.calRateDate = store.getters['xeRate/elevenAmDate'];
    cParams.value.calPerDate = store.getters['xeRate/elevenAmDate'];
    cParams.value.from_country_iso = store.getters['xeRate/cFromCurrency'];
    cParams.value.to_country_iso = store.getters['xeRate/cToCurrency'];
    getCalculatorRate();
}
const getCalculatorRate = () => {
    store.dispatch('xeRate/getCalculatorRate',{...cParams.value});
}
const inputRate = ref(null);
const inputPercent = ref(null);
const setInputRate = () => {
    store.dispatch('xeRate/getInputRate',inputRate.value);
}
const setInputPercent = () => {
    store.dispatch('xeRate/getInputPercent',inputPercent.value);
}
const onChangeDateForRate = () => {
    if(!isCallOnChangeEvent.value){
        let payload = {};
        payload.from_country_iso = cParams.value.from_country_iso;
        payload.to_country_iso = cParams.value.to_country_iso;
        payload.hrp_start_date_time = cParams.value.calRateDate;
        payload.flag = 'rate'
        store.dispatch('xeRate/getCalculatorElevenAmRate',{...payload});
    }    
    //console.log(cParams.value.calRateDate);
}
const onChangeDateForPercent = () => {
    if(!isCallOnChangeEvent.value){
        let payload = {};
        payload.from_country_iso = cParams.value.from_country_iso;
        payload.to_country_iso = cParams.value.to_country_iso;
        payload.hrp_start_date_time = cParams.value.calPerDate;
        payload.flag = 'percent'
        store.dispatch('xeRate/getCalculatorElevenAmRate',{...payload});
    }    
    //console.log(cParams.value.calPerDate);
}
</script>

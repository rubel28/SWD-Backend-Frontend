import axiosClient from "@/axios";
import useCalculator from "@/composables/useCalculator";
import useFormatDate from "@/composables/useFormatDate";
import useHelper from "@/composables/useHelper";
import useShowMessage from "@/composables/useShowMessage";
const { showMessage } = useShowMessage();
const { formatDate,formatYear } = useFormatDate();
const { checkElevenAm, createNewCustomDate } = useHelper();
const { calculator } = useCalculator();

function postCurrency(param) {
    return axiosClient.post('/countries/country-is-display', param)
        .then((res) => {
            if (typeof res.data.success !== 'undefined' && res.data.success === true) {
                //commit("setButtonLoading", false);
                showMessage(res.data.message, 'success');// type => success/error
                return true;
            }
            showMessage(res.data.message, 'error');// type => success/error
            return false;
        })
        .catch((err) => {
            //commit("setButtonLoading", false);
            throw err;
        });
}


export default {
    namespaced: true,
    state: {
        elevenAmRate: {
            loading: false,
            data:[],
           /* data: [
                {currency:'USD',USD:1,SGD:1.3,GBP:1.2,EUR:1.1},
                {currency:'GBP',USD:1.1,SGD:'1.5',GBP:1,EUR:1.1},
                {currency:'EUR',USD:1.1,SGD:1.3,GBP:1.2,EUR:1},
                {currency:'SGD',USD:0.7,SGD:1,GBP:1.2,EUR:1.1},
                {currency:'THB',USD:0.3,SGD:1.3,GBP:1.2,EUR:1.1},
                {currency:'IDR',USD:0.3,SGD:1.3,GBP:1.2,EUR:1.1},
                {currency:'RMB',USD:0.4,SGD:1.3,GBP:1.2,EUR:1.1},
                {currency:'VND',USD:0.5,SGD:1.3,GBP:1.2,EUR:1.1},
                {currency:'MYR',USD:0.5,SGD:1.3,GBP:1.2,EUR:1.1},
                {currency:'INR',USD:0.5,SGD:1.3,GBP:1.2,EUR:1.1},
            ],*/
        },
        historicalRate: {
            loading: false,
            /*data: [],*/
            data: [
                {date:'1/2',rate:1.22342},
                {date:'2/2',rate:1.32342},
                {date:'3/2',rate:1.25342},
                {date:'4/2',rate:1.34342},
                {date:'5/2',rate:1.27344},
                {date:'6/2',rate:1.29342},
                {date:'7/2',rate:1.35642},
            ],
            fromCur: 'USD',
            toCur: 'SGD',
            /*series:[],
            labels:[]*/
        },
        liveRate: {
            loading: false,
            /*data:[],*/
            data:[
                {time:'11:00',rate:1.72342},
                {time:'12:00',rate:1.26342},
                {time:'01:00',rate:1.32342},
                {time:'02:00',rate:1.29342},
                {time:'03:00',rate:1.22342},
                {time:'04:00',rate:1.4342},
                {time:'05:00',rate:1.52342},
                {time:'06:00',rate:1.39342},
                {time:'07:00',rate:1.27322},
                {time:'08:00',rate:1.62342},
                {time:'09:00',rate:1.35342},
            ],
            fromCur: 'USD',
            toCur: 'SGD',
            elevenAmRate: 0,
            liveRate: 0,
        },
        calculator: {
            loading: false,
            fromCur: 'USD',
            toCur: 'SGD',
            percentElevenAmRate: 0,
            rateElevenAmRate: 0,
            liveRate:0,
            inputRate:null,
            inputPercent:null,
            elevenAmDate:'',
            isCallOnChangeEvent: false
        },
        buttonLoading: {
            loading: false,
        },
    },
    getters: {
        /* 11 am rate tab */
        elevenAmRate(state){
            return state.elevenAmRate.data;
        },
        loadingElevenAmTab(state){
            return state.elevenAmRate.loading;
        },
        buttonLoading(state){
            return state.buttonLoading.loading;
        },
        /* End 11 am rate tab */
        
        /* Historical rate tab */
        loadingHistoricalTab(state){
            return state.historicalRate.loading;
        },
        historicalRate(state){
            return state.historicalRate.data;
        },
        historicalSeries(state){
            return state.historicalRate.data.map((item) => { return item.rate; });
        },
        historicalLabels(state){
            return state.historicalRate.data.map((item) => { return item.date; });
        },
        hFromCurrency(state){
            return state.historicalRate.fromCur;
        },
        hToCurrency(state){
            return state.historicalRate.toCur;
        },
        hCurrencyPair(state){
            return state.historicalRate.fromCur + "/" + state.historicalRate.toCur;
        },
        /* End Historical rate tab */

        /* Live rate tab */
        liveSeries(state){
            return state.liveRate.data.map((item) => { return item.rate; });
        },
        liveLabels(state){
            return state.liveRate.data.map((item) => { return item.time; });
        },
        lFromCurrency(state){
            return state.liveRate.fromCur;
        },
        lToCurrency(state){
            return state.liveRate.toCur;
        },
        lCurrencyPair(state){
            return state.liveRate.fromCur + "/" + state.liveRate.toCur;
        },
        lElevenAmRate(state){
            return state.liveRate.elevenAmRate;
        },
        lLiveRate(state){
            return state.liveRate.liveRate;
        },
        calculateLiveTabPercentage(state){
            return calculator('percent',state.liveRate.elevenAmRate,state.liveRate.liveRate);
        },
        /* End Live rate tab */

        /* Calculator tab */
        cFromCurrency(state){
            return state.calculator.fromCur;
        },
        cToCurrency(state){
            return state.calculator.toCur;
        },
        cCurrencyPair(state){
            return "(" + state.calculator.fromCur + "/" + state.calculator.toCur + ")";
        },
        cpElevenAmRate(state){
            return state.calculator.percentElevenAmRate;
        },
        crElevenAmRate(state){
            return state.calculator.rateElevenAmRate;
        },
        cLiveRate(state){
            return state.calculator.liveRate;
        },
        calculateElevenAmPercentage(state){
            if(!state.calculator.inputRate) return '';
            return calculator('percent',state.calculator.inputRate,state.calculator.percentElevenAmRate);// type: percent/rate
        },
        calculateLivePercentage(state){
            if(!state.calculator.inputRate) return '';
            return calculator('percent',state.calculator.inputRate,state.calculator.liveRate);
        },
        calculateElevenAmNewRate(state){
            if(!state.calculator.inputPercent) return '';
            return calculator('rate',state.calculator.inputPercent,state.calculator.rateElevenAmRate);
        },
        calculateLiveNewRate(state){
            if(!state.calculator.inputPercent) return '';
            return calculator('rate',state.calculator.inputPercent,state.calculator.liveRate);
        },
        elevenAmDate(state){
            return state.calculator.elevenAmDate;
        },
        isCallOnChangeEvent(state){
            return state.calculator.isCallOnChangeEvent;
        },
        /* End calculator tab */
        
    },
    mutations: {
        /* 11 am rate tab */
        setElevenAmRate: (state, rates) => {
            let curTo = rates.data.data.xeCurrency11AMRates.map((item) => {
                let cur = { 'currency':item.from_country_currency };
                let rate = item.to_country_data.reduce((acc, curr) => {
                    return {...acc,[curr.quotecurrency]: curr.mid};
                },{})
                return {...cur,...rate};
            });
            state.elevenAmRate.data = curTo;
        },
        setElevenAmRateLoading: (state, loading) => {
            state.elevenAmRate.loading = loading;
        },
        setButtonLoading:(state,payload) => {
            state.buttonLoading.loading = payload;
        },
        /* End 11 am rate tab */

        /* Historical rate tab */
        setHistoricalRate: (state, payload) => {
            let toCur = state.historicalRate.toCur;
            let rates = payload.to[toCur].map((item) => {
                let formatDate = item.timestamp.substring(0, 10).split('-');
                return {
                    'date':formatDate[2]+"/"+formatDate[1],
                    'rate':item.mid
                }
            });
            state.historicalRate.data = rates;
        },        
        setHistoricalRateLoading: (state, loading) => {
            state.historicalRate.loading = loading;
        },
        setHistoricalFromCur: (state, payload) => {
            state.historicalRate.fromCur = payload;
        },
        setHistoricalToCur: (state, payload) => {
            state.historicalRate.toCur = payload;
        },
        /* End Historical rate tab */

        /* Live rate tab */
        setLiveRates:(state,payload) => {
            let toCur = state.liveRate.toCur;
            /*let rates = payload.to[toCur].map((item) => {
                return {
                    'time':item.timestamp.slice(11,16),
                    'rate':item.mid
                }
            });
            state.liveRate.data = rates;*/
        },
        setLiveRateFromCur: (state, payload) => {
            state.liveRate.fromCur = payload;
        },
        setLiveRateToCur: (state, payload) => {
            state.liveRate.toCur = payload;
        },        
        setLElevenAmRate: (state, payload) => {
            state.liveRate.elevenAmRate = payload;
            //let toCur = state.liveRate.toCur;
            /*let rate = payload.to[toCur].map((item) => {
                return item.mid;
            });
            state.liveRate.elevenAmRate = rate;*/
        },
        setLLiveRate: (state, payload) => {
            state.liveRate.liveRate= payload;
            /*let liveRate = payload.to.map((item) => {
                return item.mid;
            });
            state.liveRate.liveRate= liveRate;*/
        },
        /* End Live rate tab */

        /* Calculator tab */
        setCalculatorFromCur: (state, payload) => {
            state.calculator.fromCur = payload;
        },
        setCalculatorToCur: (state, payload) => {
            state.calculator.toCur = payload;
        },
        setPercentElevenAmRate: (state, payload) => {
            state.calculator.percentElevenAmRate = payload;
            //let toCur = state.calculator.toCur;
            /*let rate = payload.to[toCur].map((item) => {
                return item.mid;
            });
            state.calculator.percentElevenAmRate = rate;*/
        },
        setRateElevenAmRate: (state, payload) => {
            state.calculator.rateElevenAmRate = payload;
            //let toCur = state.calculator.toCur;
            /*let rate = payload.to[toCur].map((item) => {
                return item.mid;
            });
            state.calculator.rateElevenAmRate = rate;*/
        },
        setCalculatorLiveRate: (state, payload) => {
            state.calculator.liveRate = payload;
            /*let liveRate = payload.to.map((item) => {
                return item.mid;
            });
            state.calculator.liveRate = liveRate;*/
        },
        setInputRate: (state, payload) => {
            state.calculator.inputRate = payload;
        },
        setInputPercent: (state, payload) => {
            state.calculator.inputPercent = payload;
        },
        setElevenAmDate: (state, payload) => {
            let date = formatDate(new Date(),'d/m/yy');
            if(payload){
                date = formatDate(createNewCustomDate(-1),'d/m/yy');
            }
            state.calculator.elevenAmDate = date;
        },
        setIsCallOnChangeEvent:(state,payload) => {
            state.calculator.isCallOnChangeEvent = payload;
        },
        /* End calculator tab */

        /*setHistoricalSeries: (state, series) => {
            state.historicalRate.series = series;
        },
        setHistoricalLabels: (state, labels) => {
            state.historicalRate.labels = labels;
        },*/
    },
    actions: {
        /* 11 am rate tab */
        getElevenAmRate({commit,dispatch}){
            dispatch("country/getAllCountries",{},{root:true});
            commit('setElevenAmRateLoading',true);
            return axiosClient.get('/xe-currency-11am-rates/xe-currency-11am-rate-list')
                .then((res) => {
                    if(typeof res.data.success !== 'undefined' && res.data.success === true){                        
                        commit('setElevenAmRate', res);
                    }
                    return res;
                })
                .catch((err) => {
                    commit("setElevenAmRateLoading", false);
                    throw err;
                });
            /*let params = {
                from_country_iso:'EUR',
                to_country_iso:'USD,SGD,GBP,EUR',
                from_decimal_places:3
            }
            return axiosClient.post('/xe-currency-convert-form',params)
                .then((res) => {
                    //console.log(res.data.data.response)
                    if(typeof res.data.success !== 'undefined' && res.data.success === true){
                        let curTo = res.data.data.response.to.reduce((acc,curr) => {
                            return {...acc,[curr.quotecurrency]: curr.mid}
                        },[]);
                        curTo['currency'] = res.data.data.response.from;
                        curToArr.push(curTo);
                        commit('setElevenAmRate', curToArr);
                        //console.log(curToArr)
                        //commit('setElevenAmRateLoading',false);
                    }                    
                    return res;
                })
                .catch((err) => {
                    commit("setElevenAmRateLoading", false);
                    throw err;
                });*/
        },
        saveElevenAmCurrency({commit},payload){
            if(payload.currency.length < 1){
                showMessage("Select Currency",'error');// type => success/error
                return false;
            }
            let param = payload.currency.map((item) => {
                return {
                    'country_id':item,
                    'country_is_display':'YES'
                }
            });
            //console.log(param);
            commit('setButtonLoading',true);
            let response = postCurrency(param).then((res) => {
                commit('setButtonLoading',false);
                return res;
            });            
            return response;
        },
        removeElevenAmCurrency({commit,rootGetters,dispatch},payload){
            const countryList = rootGetters['country/countryList'];
            let param = countryList.filter((d) => d.country_currency === payload)
                .map((item) => {
                    return {
                        'country_id':item.id,
                        'country_is_display':'NO'
                    }
                });
            //console.log(param);
            let response = postCurrency(param).then((res) => {
                dispatch("country/getAllCountries",{},{root:true});
                return res;
            });
            return response;
        },
        /* End 11 am rate tab */

        /* Historical rate tab */
        getHistoricalRate({commit,rootGetters,dispatch},param){
            //console.log(param);
            //commit("setHistoricalRateLoading", true);
            param.hrp_end_date_time = param.hrp_end_date_time.split("/").reverse().join("-") +" "+ "11:00";
            param.hrp_start_date_time = param.hrp_start_date_time.split("/").reverse().join("-") +" "+ "11:00";
            param.hrp_interval = "daily";
            param.hrp_decimal_places = rootGetters['constant/hrpDecimalPlaces'];
            commit('setHistoricalFromCur',param.from_country_iso);
            commit('setHistoricalToCur',param.to_country_iso);
            /*commit("setHistoricalRateLoading", true);
            dispatch('xeHistoricalRate',param).then((res) => {
                console.log(res);                
                commit('setHistoricalRate', res);
                commit("setHistoricalRateLoading", false);
            });*/
        },
        /* End Historical rate tab */

        /* Live rate tab */
        getLiveRate({commit,rootGetters,dispatch},payload){

            /* Call for live rates graph */
            payload.hrp_interval = "hourly";
            payload.hrp_start_date_time = formatDate(createNewCustomDate(-1),'yyyy-mm-dd-tt');
            payload.hrp_end_date_time = formatDate(new Date(),'yyyy-mm-dd-tt');
            payload.hrp_decimal_places = rootGetters['constant/hrpDecimalPlaces'];
            commit('setLiveRateFromCur',payload.from_country_iso);
            commit('setLiveRateToCur',payload.to_country_iso);
            commit('setLElevenAmRate',2.76532);
            commit('setLLiveRate',2.02343);
            //console.log(payload);          
            /*commit("setHistoricalRateLoading", true);
            dispatch('xeHistoricalRate',payload).then((res) => {
                console.log(res);
                commit('setLiveRates', res);           
                commit("setHistoricalRateLoading", false);                
            });*/
            
            /* End Call for live rates graph */
            
            /* Call for 11 am rate */
            let elevenAmPayload = {};
            elevenAmPayload.hrp_start_date_time = formatDate(new Date(),'yyyy-mm-dd')+" "+"11:00";
            elevenAmPayload.from_country_iso = payload.from_country_iso;
            elevenAmPayload.to_country_iso = payload.to_country_iso;
            elevenAmPayload.hrp_decimal_places = rootGetters['constant/hrpDecimalPlaces'];
            //console.log(elevenAmPayload);
            /*dispatch('xeHistoricalRate',elevenAmPayload).then((res) => {
                console.log(res);
                commit('setLElevenAmRate', res);
            });*/
            /* End Call for 11 am rate */
            /* Call for live rate */
            let liveConvertPayload = {};
            liveConvertPayload.from_country_iso = payload.from_country_iso;
            liveConvertPayload.to_country_iso = payload.to_country_iso;
            liveConvertPayload.from_decimal_places = rootGetters['constant/hrpDecimalPlaces'];
            //console.log(liveConvertPayload);
            /*dispatch('xeConvertLiveRate',liveConvertPayload).then((res) => {
                console.log(res);
                commit('setLLiveRate', res);
            });*/
            /* End Call for live rate */
        },
        /* End Live rate tab */

        /* Calculator tab */
        getCalculatorRate({commit,rootGetters,dispatch},payload){
            payload.calPerDate = formatYear(payload.calPerDate).split("/").reverse().join("-") +" "+ "11:00";
            payload.calRateDate = formatYear(payload.calRateDate).split("/").reverse().join("-") +" "+ "11:00";
            //console.log(payload);

            commit('setCalculatorFromCur',payload.from_country_iso);
            commit('setCalculatorToCur',payload.to_country_iso);
            commit('setPercentElevenAmRate',32.32);
            commit('setRateElevenAmRate',31.32);
            commit('setCalculatorLiveRate',31);

            /*commit("setHistoricalRateLoading", true);*/
            //commit("setIsCallOnChangeEvent", true);
            // call for calculator live rate
            let liveConvertPayload = {};
            liveConvertPayload.from_country_iso = payload.from_country_iso;
            liveConvertPayload.to_country_iso = payload.to_country_iso;
            liveConvertPayload.from_decimal_places = rootGetters['constant/hrpDecimalPlaces'];
            /*dispatch('xeConvertLiveRate',liveConvertPayload).then((res) => {
                //console.log(res);
                commit('setCalculatorLiveRate', res);
            });*/

            // call for calculator 11 am rate
            let elevenAmPayload = {};
            elevenAmPayload.from_country_iso = payload.from_country_iso;
            elevenAmPayload.to_country_iso = payload.to_country_iso;
            elevenAmPayload.hrp_decimal_places = rootGetters['constant/hrpDecimalPlaces'];
            if(payload.calRateDate != payload.calPerDate){
                // call for percent calculate section
                elevenAmPayload.hrp_start_date_time = payload.calRateDate;
                //console.log(elevenAmPayload);
                /*dispatch('xeHistoricalRate',elevenAmPayload).then((res) => {
                    //console.log(res);
                    commit('setPercentElevenAmRate', res);
                    
                    // call for rate calculate section
                    elevenAmPayload.hrp_start_date_time = payload.calPerDate;
                    console.log(elevenAmPayload);
                    dispatch('xeHistoricalRate',elevenAmPayload).then((res) => {
                        //console.log(res);
                        commit('setRateElevenAmRate', res);
                        commit("setHistoricalRateLoading", false);
                        commit("setIsCallOnChangeEvent", false);
                    });
                });*/                
            }else{
                elevenAmPayload.hrp_start_date_time = payload.calRateDate;
                //console.log(elevenAmPayload);
                /*dispatch('xeHistoricalRate',elevenAmPayload).then((res) => {
                    //console.log(res);
                    commit('setPercentElevenAmRate', res);
                    commit('setRateElevenAmRate', res);
                    commit("setHistoricalRateLoading", false);
                    commit("setIsCallOnChangeEvent", false);
                });*/
            }
            
        },
        getCalculatorElevenAmRate({commit,rootGetters,dispatch},payload){
            payload.hrp_start_date_time = formatYear(payload.hrp_start_date_time).split("/").reverse().join("-") +" "+ "11:00";
            let flag = payload.flag;
            delete payload.flag;
            payload.hrp_decimal_places = rootGetters['constant/hrpDecimalPlaces'];
            //console.log(payload);
            /*commit("setHistoricalRateLoading", true);
            dispatch('xeHistoricalRate',payload).then((res) => {
                //console.log(res);
                if(flag === 'rate'){
                    commit('setPercentElevenAmRate', res);
                }
                if(flag === 'percent'){
                    commit('setRateElevenAmRate', res);
                }               
                commit("setHistoricalRateLoading", false);
            });*/
        },
        getInputRate({commit},payload){
            commit('setInputRate',payload);
        },
        getInputPercent({commit},payload){
            commit('setInputPercent',payload);
        },
        getElevenAmDate({commit}){
            let isCurrentTimeIsLessThanElevenAm = checkElevenAm();
            commit('setElevenAmDate',isCurrentTimeIsLessThanElevenAm);
            
        },
        /* End Calculator tab */
        
        xeHistoricalRate({commit},payload){
            //console.log(payload);
            return axiosClient.post('/xe-currency-historic-rate-period',payload)
                .then((res) => {
                    //console.log(res.data.data.response)
                    if(typeof res.data.success !== 'undefined' && res.data.success === true){
                        return res.data.data.response;
                }
            })
            .catch((err) => {
                commit("setHistoricalRateLoading", false);
                throw err;
            });
        },
        xeConvertLiveRate({commit},payload){
            //console.log(payload);
            return axiosClient.post('/xe-currency-convert-form',payload)
                .then((res) => {
                    //console.log(res.data.data.response)                    
                    if(typeof res.data.success !== 'undefined' && res.data.success === true){
                        return res.data.data.response;                        
                    }                    
                })
                .catch((err) => {
                    throw err;
                });
        },
    }
}

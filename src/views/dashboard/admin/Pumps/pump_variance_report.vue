<template>
    <masterLayout>
         <section class=" mt-3 full__row_section">
            <div class="banner">
                <div class="row hundred-percent-height align-items-center">
                    <div class="col-lg-12">
                        <div class="dashboard__card large_card"  :style="[
                                    {
                                    backgroundImage: `linear-gradient(rgb(37, 37, 37 , 0.9), rgb(37, 37, 37 , 0.9)), url(${backgroundUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                    }
                                ]">
                                <div class="row  hundred-percent-height align-items-center">
                                    <div class="col-md-4 text-center">
                                        <router-link :to="{name:'audit_sales', query: {companyId: this.$route.query.companyId}}">
                                             <i class="fa fa-chevron-circle-left" aria-hidden="true" style="color: white; font-size: 28px"></i>
                                        </router-link>
                                    </div>
                                    <div class="col-md-3">
                                         <div class="small__card_content_wrapper  " >
                                            <h4 class="yellow_text">{{varianceObj.branchName}}</h4>
                                            <h6 class="grey_text">{{varianceObj.date}}</h6>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <vue-ctk-date-time-picker
                                            v-model="dateRange"
                                            :max-date="maxDate"
                                            :range="true"
                                            :autoClose="true"
                                            :custom-shortcuts="customShortcuts"
                                            color="#290C53"
                                            format="DDMMYYYY"
                                            formatted="DD/MM/YYYY"
                                            label="Select a date range"
                                        />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
         <section class="top_section_row mt-3 ">
            <div class="row  mt-3 align-items-center py-3 ">
                <div class="col-md-8">
                    <span class="pl-3 ">Pump Sales between  {{startDate}} and {{endDate}} </span>
                </div>
                <div class="col-md-4 text-right">
                   
                </div>
            </div>
        </section>
        <section class=" mt-3 full__row_section">
             <div class="row ">
                <div class="col-md-4" v-for="(x,i) in 3" :key="i + 'A'" v-show="showLoader">
                    <TableLoader :showLoader="showLoader"/>
                </div>
                <div class="col-md-4 remove-right-padding" v-for="(pmpSale,index) in totalPumpSales" :key="index + 'C'" v-show="!showLoader">
                    <div class="header-three-text">{{pmpSale.tankName}}</div>
                    <div class="small_card product_details_card mt-3">
                        <div class="product_sales_flex_card_pump_sales first">
                            <div class="product_sales_flex_card_item">
                                <div class="total_text">PUMP NAME</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">VOLUME  Sold</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card_pump_sales" v-for="(pmp,x) in pmpSale.pumpSalesArr" :key="x + 'B'">
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">
                                    {{pmp['sale'][0].pumpName}}
                                </div>
                            </div>
                            <div class="product_sales_flex_card_item">
                              <div class="text-black ">
                                    {{convertThousand(pmp['volumeSold'])}} Ltrs</div>
                                </div>
                        </div>
                        <div class="product_sales_flex_card_pump_sales last">
                            <div class="product_sales_flex_card_item">
                                <div class="total_text">TOTAL PUMP SALES</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black total_text ">{{convertThousand(pmpSale.totalVolumeSold)}} Ltrs</div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </section>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";
import backgroundUrl from "@/assets/img/Tankimage.png";
// import PumpVarianceTemplate from '@/components/Templates/list_of_pump_variance_reports_template.vue';
import Jquery from 'jquery';
let $ = Jquery;
import TableLoader from "@/components/tableLoader/index";



export default {
    components: {
        masterLayout,
        TableLoader
    },
    data() {
        return {
            showLoader: false,
            varianceObj: {},
            companiesCount: 0,
            stationsCount: 0,
            backgroundUrl,
            totalPumpSales: [],
            maxDate: this.$moment(new Date()).format("YYYY-MM-DD"),
                customShortcuts: [
                { key: "Today", label: "Today", value: "day" },
                { key: "yesterday", label: "Yesterday", value: "-day" },
                { key: "last7Days", label: "Last 7 Days", value: 7 },
                { key: "lastWeek", label: "Last Week", value: "-isoWeek" },
                { key: "last30Days", label: "Last 30 Days", value: 30 },
                { key: "lastMonth", label: "Last Month", value: "-month" }
            ],
            startDate: this.$moment().format("MMMM D, YYYY"),
            endDate: this.$moment().format("MMMM D, YYYY"),
            pluginStartDate: this.$moment().format("D-M-YYYY"),
            pluginEndDate: this.$moment().format("D-M-YYYY"),
            dateRange: { "start": this.pluginStartDate, "end":this.pluginEndDate },
        }
    },
    watch: {
        dateRange: function (newRange, oldRange) {
            if ( newRange.start!== null && newRange.end !== null) {
                this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
                this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

                this.getSales();
            }
        },
    },
    mounted() {
        this.getSales()
        this.varianceId = this.$route.query.varianceId;
        let ml = sessionStorage.getItem(this.varianceId);
        if (!ml) {
        let allData = localStorage.getItem("pumpsVarianceList");
        let dt = JSON.parse(allData);
        dt.forEach((my, index) => {
            if (my.index === this.varianceId) {
            ml = JSON.stringify(my);
            sessionStorage.setItem(this.varianceId, ml);
            }
        });
        }
        let pumpVarianceDetailsObj = JSON.parse(ml);
        this.varianceObj = pumpVarianceDetailsObj;
        console.log(this.varianceObj)
    },
    methods: {
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getSales() {
            this.showLoader = true
            this.axios
            .get(
                `https://oh.epump.com.ng/Audit/DaySale/${this.$route.query.branchId}?startDate=${this.startDate}&endDate=${this.endDate}`, configObject.authConfig)
                .then(res => {
                    const ids = new Set(res.data.pumpDaySales.map(cur => cur.tankName))
                    const _salesArr = []
                    res.data.pumpDaySales.forEach(cur => {
                        ids.forEach(current => {
                            const index = _salesArr.findIndex(el => el.tankName == current)
                            if (index == -1 && cur.tankName == current) {
                                _salesArr.push({
                                    tankName: current,
                                    data: [cur],
                                });
                            } 
                            if (index != -1 && cur.tankName == current) {
                                const value = _salesArr[index].data
                                _salesArr[index].data = [...value, cur]
                            }
                        })
                    });
                    let pumpTankSales = _salesArr.map((sale,i) =>  {
                        const pumpNames = new Set(_salesArr[i].data.map(cur => cur.pumpName))
                        Array.prototype.groupBy = function(prop) {
                            return this.reduce(function(groups, item) {
                                const val = item[prop]
                                groups[val] = groups[val] || []
                                groups[val].push(item)
                                return groups
                            }, {})
                        };
                        const groupByPumpName = _salesArr[i].data.groupBy('pumpName');
                        const pumpSalesArr = Object.keys(groupByPumpName).map(cur => {
                            return {
                                sale: groupByPumpName[cur]
                            }
                        })
                        pumpSalesArr.forEach(x => {
                            const volumeSold = x.sale.reduce((acc,cur) => {
                                return acc += cur.volumeSold
                            },0);
                            x.volumeSold = volumeSold
                        })
                        return {
                            tankName: sale.tankName,
                            pumpSalesArr,
                            totalVolumeSold: pumpSalesArr.reduce((acc,cur) => {
                                return acc += cur.volumeSold
                            },0)
                        }
                    })
                    
                    this.totalPumpSales = pumpTankSales
                    this.showLoader = false
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
    }
}
</script>
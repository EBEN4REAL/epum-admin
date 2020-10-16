<template>
    <masterLayout>
         <section class=" mt-3 full__row_section">
            <div class="banner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="dashboard__card large_card"  :style="[
                                    {
                                    backgroundImage: `linear-gradient(rgb(37, 37, 37 , 0.9), rgb(37, 37, 37 , 0.9)), url(${backgroundUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                    }
                                ]">
                                <div class="row align-items-center justify-content-center hundred-percent-height">
                                    <div class="col-md-4">
                                         <div class="small__card_content_wrapper align-items-center " >
                                            <p class="dashboard__card__header text-white">AUDIT SALES</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
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
        <section class=" mt-3 full__row_section">
             <div class="row">
                <div class="col-md-4 remove-right-padding">
                    <div class="header-three-text">Product Tank sales</div>
                    <div class="small_card product_details_card mt-3" v-show="!showLoader">
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">

                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volmne  Sold</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volume Refilled</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" epump-color">PMS</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(pmsTankVolumeSold)}} Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(pmsTankVolumeFilled)}} Ltrs</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" epump-color">AGO</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(agoTankVolumeSold)}} Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(agoTankVolumeFilled)}} Ltrs</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class="epump-color">DPK</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(dpkTankVolumeSold)}} Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(dpkTankVolumeFilled)}} Ltrs</div>
                            </div>
                        </div>
                    </div>
                    <TableLoader :showLoader="showLoader"/>
                </div>
                <div class="col-md-8 ">
                    <div class="header-three-text">Product Day sales</div>
                    <div class="small_card product_details_card mt-3"  v-show="!showLoader">
                        <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">

                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volume </div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Amount</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Price</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">RTT</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">RTT AMount</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class="">PMS</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(pmsDaySaleVolume)}} Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(pmsDaySaleAmount)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(pmsDaySalePrice)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(pmsDaySaleRTT)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(pmsDaySaleRttAmount)}}</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" ">AGO</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(agoDaySaleVolume)}} Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(agoDaySaleAmount)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(agoDaySalePrice)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(agoDaySaleRTT)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(agoDaySaleRttAmount)}}</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" ">DPK</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{convertThousand(dpkDaySaleVolume)}} Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(dpkDaySaleAmount)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(dpkDaySalePrice)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(dpkDaySaleRTT)}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; {{convertThousand(dpkDaySaleRttAmount)}}</div>
                            </div>
                        </div>
                    </div>
                    <TableLoader :showLoader="showLoader"/>
                </div>
            </div>
        </section>
        <section class="top_section_row mt-3 ">
            <div class="row  mt-3 align-items-center py-3 ">
                <div class="col-md-8">
                    <span class="pl-3 ">Pump Sales between {{startDate}} and {{endDate}}</span>
                </div>
                <div class="col-md-4 text-right">
                   
                </div>
            </div>
        </section>
        <div class="new_row_section mt-3 pb-4">
             <ejs-grid
                v-show="!showLoader"
                ref="dataGrid"
                :created="refreshGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                >
                <e-columns>
                    <e-column width="60" field="index" headerText="#"></e-column>
                    <e-column width="200" field="date" headerText="Date Modified"></e-column>
                    <e-column width="200" field="volumeSold" headerText="Volume Sold"></e-column>
                    <e-column width="200" field="amountSold" headerText="Amount Sold"></e-column>
                    <e-column width="200" field="openingReading" headerText="Opening Reading"></e-column>
                    <e-column width="200" field="lastReading" headerText="Last Reading "></e-column>
                    <e-column width="200" field="productName" headerText="Product Name"></e-column>
                    <e-column width="200" field="tankName" headerText="Tank Name"></e-column>
                    <e-column width="200" field="rtt" headerText="RTT"></e-column>
                    <e-column width="200" field="rttAmount" headerText="RTT Amount"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
        </div>
        <section class="top_section_row mt-3 ">
            <div class="row  mt-3 align-items-center py-3 ">
                <div class="col-md-8">
                    <span class="pl-3 ">Tank Sales between {{startDate}} and {{endDate}}</span>
                </div>
                <div class="col-md-4 text-right">
                    
                </div>
            </div>
        </section>
        <div class="new_row_section mt-3 pb-4">
             <ejs-grid
                v-show="!showLoader"
                ref="tankSalesdataGrid"
                :created="refreshTankSalesGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                >
                 <e-columns>
                    <e-column width="60" field="index" headerText="#"></e-column>
                    <e-column width="200" field="volumeSold" headerText="Volume Sold"></e-column>
                    <e-column width="200" field="volumeFilled" headerText="Volume Filled"></e-column>
                    <e-column width="200" field="openingDip" headerText="Opening  Dip" textAlign="center"></e-column>
                    <e-column width="200" field="closingDip" headerText="Closing  Dip" textAlign="center"></e-column>
                    <e-column width="200" field="productName" headerText="Product  Name" textAlign="center"></e-column>
                    <e-column width="200" field="tankName" headerText="Tank  Name" textAlign="center"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";
import backgroundUrl from "@/assets/img/Tankimage.png";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import TableLoader from "@/components/tableLoader/index";
import Paginator from '@/components/Paginator.vue';
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';
import AuditSalesTemplate from '@/components/Templates/Audit_sales_template.vue';


import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        masterLayout,
        TableLoader,
        Paginator,
        DropDown
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },  
    data() {
        return {
            companiesCount: 0,
            showLoader: false,
            stationsCount: 0,
            backgroundUrl,
            pmsTankVolumeSold: 0,
            pmsTankVolumeFilled: 0,
            agoTankVolumeSold: 0,
            agoTankVolumeFilled: 0,
            dpkTankVolumeSold: 0,
            dpkTankVolumeFilled: 0,
            pmsDaySaleAmount: 0,
            pmsDaySaleVolume: 0,
            pmsDaySaleRTT: 0,
            pmsDaySaleRttAmount: 0,
            pmsDaySalePrice: 0,
            agoDaySaleAmount: 0,
            agoDaySaleVolume: 0,
            agoDaySaleRTT: 0,
            agoDaySaleRttAmount: 0,
            agoDaySalePrice: 0,
            dpkDaySaleAmount: 0,
            dpkDaySaleVolume: 0,
            dpkDaySaleRTT: 0,
            dpkDaySaleRttAmount: 0,
            dpkDaySalePrice: 0,
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
            details: {
                id: '',
                info: [{ name: 'Edit', link: 'sales_rep' }], 
                delete: { hasDelete: false, deleteName: 'deleteCompany'}
            },
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            AuditSalesTemplate: () => {
                return {
                    template: AuditSalesTemplate
                };
            },
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
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getelsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
    },  
    methods: {
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        parseProductDaySales(data) {
            const pmsSales = data.filter(el => el.product.toLowerCase() === 'pms');
            const agoSales = data.filter(el => el.product.toLowerCase() === 'ago');
            const dpkSales = data.filter(el => el.product.toLowerCase() === 'dpk');
            
            // PMS
            let pmsDaySaleAmount = pmsSales.reduce((acc,cur) => {
                return acc += cur.amount
            },0)
            let pmsDaySaleVolume = pmsSales.reduce((acc,cur) => {
                return acc += cur.volume
            },0)
            let pmsDaySaleRTT = pmsSales.reduce((acc,cur) => {
                return acc += cur.rtt
            },0)
            let pmsDaySaleRttAmount = pmsSales.reduce((acc,cur) => {
                return acc += cur.rttAmount
            },0)
            this.pmsDaySaleAmount = pmsDaySaleAmount
            this.pmsDaySaleVolume = pmsDaySaleVolume
            this.pmsDaySaleRTT = pmsDaySaleRTT
            this.pmsDaySaleRttAmount = pmsDaySaleRttAmount
            this.pmsDaySalePrice = pmsSales[0].price

            // AGO
            let agoDaySaleAmount = agoSales.reduce((acc,cur) => {
                return acc += cur.amount
            },0)
            let agosDaySaleVolume = agoSales.reduce((acc,cur) => {
                return acc += cur.volume
            },0)
            let agoDaySaleRTT = agoSales.reduce((acc,cur) => {
                return acc += cur.rtt
            },0)
            let agoDaySaleRttAmount = agoSales.reduce((acc,cur) => {
                return acc += cur.rttAmount
            },0)
            this.agoDaySaleAmount = agoDaySaleAmount
            this.agosDaySaleVolume = agosDaySaleVolume
            this.agoDaySaleRTT = agoDaySaleRTT
            this.agoDaySaleRttAmount = agoDaySaleRttAmount
            this.agoDaySalePrice = agoSales[0].price

            //DPK
            let dpkDaySaleAmount = dpkSales.reduce((acc,cur) => {
                return acc += cur.amount
            },0)
            let dpkDaySaleVolume = dpkSales.reduce((acc,cur) => {
                return acc += cur.volume
            },0)
            let dpkDaySaleRTT = dpkSales.reduce((acc,cur) => {
                return acc += cur.rtt
            },0)
            let dpkDaySaleRttAmount = dpkSales.reduce((acc,cur) => {
                return acc += cur.rttAmount
            },0)
            this.dpkDaySaleAmount = dpkDaySaleAmount
            this.dpkDaySaleVolume = dpkDaySaleVolume
            this.dpkDaySaleRTT = dpkDaySaleRTT
            this.dpkDaySaleRttAmount = dpkDaySaleRttAmount
            this.dpkDaySalePrice = dpkSales[0].price

        },
        parseTankSales(data) {
            let index = 0
            data.forEach(el => {
                el.index = ++index;
                el.volumeSold = this.convertThousand(el.volumeSold);
                el.volumeFilled = this.convertThousand(el.volumeFilled);
                el.openingDip = this.convertThousand(el.openingDip);
                el.closingDip = this.convertThousand(el.closingDip);
            })
            this.$refs.tankSalesdataGrid.ej2Instances.setProperties({
                dataSource: data
            });
            this.refreshTankSalesGrid();
        },
        parseProductTankSales(data) {
            const pmsSales = data.filter(el => el.productName.toLowerCase() === 'pms');
            const agoSales = data.filter(el => el.productName.toLowerCase() === 'ago');
            const dpkSales = data.filter(el => el.productName.toLowerCase() === 'dpk');
            let pmsTankVolumeSold = pmsSales.reduce((acc,cur) => {
                return acc += cur.volumeSold
            },0)
            let pmsTankVolumeFilled = pmsSales.reduce((acc,cur) => {
                return acc += cur.volumeFilled
            },0)
            
            this.pmsTankVolumeSold = pmsTankVolumeSold
            this.pmsTankVolumeFilled = pmsTankVolumeFilled
            let agoTankVolumeSold = agoSales.reduce((acc,cur) => {
                return acc += cur.volumeSold
            },0)
             let agoTankVolumeFilled = agoSales.reduce((acc,cur) => {
                return acc += cur.volumeFilled
            },0)
            this.agoTankVolumeSold = agoTankVolumeSold
            this.agoTankVolumeFilled = agoTankVolumeFilled
            let dpkTankVolumeSold = dpkSales.reduce((acc,cur) => {
                return acc += cur.volumeSold
            },0) 
            let dpkTankVolumeFilled = dpkSales.reduce((acc,cur) => {
                return acc += cur.volumeFilled
            },0) 
            this.dpkTankVolumeSold = dpkTankVolumeSold
            this.dpkTankVolumeFilled = dpkTankVolumeFilled

        },
        getSales() {
            this.showLoader = true
            this.axios
            .get(
                `https://oh.epump.com.ng/Audit/DaySale/8f59a87d-e0e4-4ffd-917c-1d38b2e3e63e?startDate=${this.startDate}&endDate=${this.endDate}`, configObject.authConfig)
                .then(res => {
                    let index = 0
                    res.data.pumpDaySales.forEach(el => {
                        el.index = ++index;
                        el.amountSold = this.convertThousand(el.amountSold)
                        el.volumeSold = this.convertThousand(el.volumeSold);
                        el.date = this.$moment(el.dateModified).format( "MM/DD/YYYY hh:mm A");
                    })
                    this.parseProductTankSales(res.data.productTankSales)
                    this.parseProductDaySales(res.data.productDaySales)
                    this.parseTankSales(res.data.tankSales)
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data.pumpDaySales
                    });
                    this.refreshGrid();
                    this.showLoader = false;
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
       
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        refreshTankSalesGrid() {
            this.$refs.tankSalesdataGrid.refresh();
        },
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    fileName: "salesAudit"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                this.$refs.dataGrid.excelExport();
                break;
            }
        },

    }
}
</script>
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
                                            <p class="dashboard__card__header text-white">TANK SALES</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4 tanksales">
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
                    <span class="pl-3 ">Tank Sales between {{startDate}} and {{endDate}}</span>
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
                    <e-column width="200" field="volumeSold" headerText="Volume Sold"></e-column>
                    <e-column width="200" field="volumeFilled" headerText="Volume Filled"></e-column>
                    <e-column width="200" field="productName" headerText="Product Name" textAlign="center"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
            <DropDown :details="details"/>
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
                info: [], 
                delete: { hasDelete: false}
            },
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
        }
    },
    watch: {
        dateRange: function (newRange, oldRange) {
        if ( newRange.start!== null && newRange.end !== null) {
            this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
            this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

            this.getTankSales();
        }
        },
    },
    mounted() {
        this.getTankSales()
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
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
        getTankSales() {
            this.showLoader = true
            this.axios
            .get(
                `https://oh.epump.com.ng/Audit/DaySale/${this.$route.query.companyBranchId}?startDate=${this.startDate}&endDate=${this.endDate}`, configObject.authConfig())
                .then(res => {
                    let index = 0
                    res.data.productTankSales.forEach(el => {
                        el.index = ++index;
                        el.volumeFilled = this.convertThousand(el.amountSold)
                        el.volumeSold = this.convertThousand(el.volumeSold);
                    })
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data.productTankSales
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
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    fileName: "tankSales"
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
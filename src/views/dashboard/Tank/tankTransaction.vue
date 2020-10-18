<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total Transactions</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/wallet.svg" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{transactionCount}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-6 card_inner_wrapper">
                            <h3>Tank Probe Transactions</h3>
                        </div>
                        <div class="col-md-6 mt-4">
                           <div class="drop_down_div align-items-center">
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
                </div>
        </section>
        <div class="new_row_section mt-3">
            <div class="row top_section_row mt-5" v-show="!showLoader">
                <div class="col-md-8">
                <span>
                    Retail Outlet tank probe transactions between {{ startDate }} and
                    {{ endDate }}
                </span>
                </div>
                <div class="col-md-4 text-right"></div>
            </div>

            <ejs-grid
                ref="dataGrid"
                v-show="!showLoader"
                :created="refreshGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                :dataSource="tableProps.tableData"  v-cloak
                >
                <e-columns>
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <e-column width="200" field="date" headerText="Date"></e-column>
                    <e-column width="200" field="productHeight" headerText="Product Height"></e-column>
                    <e-column width="200" field="productVolume" headerText="Product Volume"></e-column>
                    <e-column width="200" field="temprature" headerText="Temperature"></e-column>
                    <e-column width="200" field="waterHeight" headerText="Water Height"></e-column>
                    <e-column width="200" field="waterVolume" headerText="Water Volume"></e-column>
                    <e-column width="10"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/> 
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout';
import TableLoader from "@/components/tableLoader/index"
import configObject from "@/config";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    created() {
        this.dateRange.start = this.pluginStartDate;
        this.dateRange.end = this.pluginEndDate;
    },
    mounted() {
        this.getTankTransactions();
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClasstankName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        
    },
    watch: {
        dateRange: function (newRange, oldRange) {
            if ( newRange.start!== null && newRange.end !== null) {
                this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
                this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

                this.getTankTransactions();
            }
        },
    },
    data() {
        return {
            transactionCount: 0,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true }
            },
            showLoader: false,
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
            dateRange: { "start": this.pluginStartDate, "end":this.pluginEndDate }
        }
    },
    methods: {
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    filetankName: "branches.pdf"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getTankTransactions() {
            this.showLoader = true;
            this.axios
                .get(
                `${configObject.apiBaseUrl}/Tank/ProbeTransactions/${this.$route.query.id}?startDate=${this.startDate}&endDate=${this.endDate}`,
                configObject.authConfig
                )
                .then(response => {
                    console.log(response.data)
                    this.showLoader = false;
                    let index = 0;
                    response.data
                        .sort((a, b) => {
                            if (a.date !== b.date) {
                                return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
                            }
                    })
                    response.data.forEach(element => {
                        element.index = ++index;
                        element.date = this.$moment(element.date).format(
                        "MM/DD/YYYY hh:mm A"
                        );
                        element.productVolume = this.convertThousand(element.productVolume);
                        element.waterVolume = this.convertThousand(element.waterVolume);
                        element.productHeight = this.convertThousand(element.productHeight);
                        element.waterHeight = this.convertThousand(element.waterHeight);
                    });
                    this.transactionCount = response.data.length;
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: response.data
                    });
                    this.refreshGrid();
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response)
                    this.showLoader = false;
                });
        },
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}
</script>
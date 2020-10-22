<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Pump Status</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >7</small>
                                </div>
                        </div>
                    </div>
              </div>
              <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row  align-items-center justify-content-center" style="height:100%;">
                        <div class="col-md-3  ">
                            <h6>Pump Status</h6>
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
        <div class="new_row_section mt-3">
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
                :dataSource="tableProps.tableData"  v-cloak
                :columns="tableProps.columns"
                >
                <e-columns>
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <e-column width="200" field="stationName" headerText="Station Name"></e-column>
                    <e-column width="200" field="pumpName" headerText="Pump Name"></e-column>
                    <e-column width="200" field="deviceId" headerText="Device Id"></e-column>
                    <e-column width="200" field="todayOpening" headerText="Today Opening"></e-column>
                    <e-column width="200" field="yesterdayClosing" headerText="Yesterday Closing"></e-column>
                    <e-column width="200" field="todayClosing" headerText="Today Closing"></e-column>
                    <e-column width="200" field="difference" headerText="Difference"></e-column>
                    <e-column width="200" field="lastTransaction" headerText="Last Transaction"></e-column>
                    <e-column width="200" field="volumeToday" headerText="Volume Today"></e-column>
                    <e-column width="200" field="status" headerText="Status"></e-column>
                    <e-column width="200" field="lastHit" headerText="Last Hit"></e-column>
                    <e-column :template="pumpStatusTemplate" headerText="Action" width="100"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"  />
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/pump_status_template.vue';
import TableLoader from "@/components/tableLoader/index";
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
        this.getPumpStatus()
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        
    },
    data() {
        return {
            showLoader: false,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
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
            pumpStatusTemplate: function() {
                return {
                    template: Temp
                };
            }
        }
    },
    watch: {
        dateRange: function (newRange, oldRange) {
            if ( newRange.start!== null && newRange.end !== null) {
                this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
                this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

                this.getPumpStatus();
            }
        },
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
                    fileName: "dealers.pdf"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getPumpStatus() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Admin/PumpStatus?qSDate=${this.startDate}&qEDate=${this.endDate}`, configObject.authConfig)
                .then(res => {
                    console.log(res.data)
                    let index = 0;
                    res.data.sort((a, b) => {
                    if (a.branchName && b.branchName) {
                        return a.branchName.toLowerCase() > b.branchName.toLowerCase() ? 1 : b.branchName.toLowerCase() > a.branchName.toLowerCase() ? -1 : 0;
                    } else if (a.branchName && !b.branchName) {
                        return -1
                    } else { 
                        return 1
                    }
                        
                    });
                    res.data.forEach(el => {
                        el.lastEp2Date = this.$moment(el.lastEp2Date).format("MM/DD/YYYY hh:mm A");
                        el.index = ++index;
                        el.address = `${el.street} ${el.city}, ${el.state}`
                    })
                    this.notPushingEp2Count = res.data.length
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data
                    });
                    this.refreshGrid();
                    this.showLoader = false;
                })
                .catch(error => {
                console.log(error)
                    this.showLoader = false
                });
        },
    }
}
</script>
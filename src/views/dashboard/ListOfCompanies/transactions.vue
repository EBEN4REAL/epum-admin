<template>
    <masterLayout :branchName="branchName">
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row align-items-center" style="height: 100%">
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
                    <div class="dashboard__card small_card align-center wallet__transaction">
                        <div class="row align-items-center justify-content-center" style="height: 100%">
                        <div class="col-md-3">
                            <h5>Wallet Transactions</h5>
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
        <section class="top_section_row mt-3 ">
            <div class="row  mt-3 align-items-center py-3 ">
                <div class="col-md-8">
                    <span class="pl-3 ">  Retail Outlet wallet transactions between  <strong>{{ startDate }} </strong> and
                     <strong>{{ endDate }} </strong></span>
                </div>
                <div class="col-md-4 text-right">
                    
                </div>
            </div>
      </section>
        <div class="new_row_section mt-3">
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
                :allowTextWrap='true'
                :rowDataBound="rowDataBound"
                >
                <e-columns>
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <e-column width="200" field="date" headerText="Date"></e-column>
                    <e-column width="200" field="amount" headerText="Transaction Amount"></e-column>
                    <e-column width="200" field="walletBalance" headerText="Wallet Balance"></e-column>
                    <e-column width="200" field="source" headerText="Source"></e-column>
                    <e-column width="200" field="status" headerText="Status"></e-column>
                    <e-column width="200" field="responseCode" headerText="Response Code"></e-column>
                    <e-column width="200" field="transactionId" headerText="Transaction ID"></e-column>
                    <e-column width="200" field="sessionId" headerText="Session ID"></e-column> 
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
        this.getTransactions();

        const companyBranchId = this.$route.query.companyBranchId
        let ml = sessionStorage.getItem(companyBranchId)
        if (!ml){
            let allData = localStorage.getItem("branchesList")
            let dt = JSON.parse(allData)
            dt.forEach((my, index) =>{
                if(my.id === companyBranchId){
                    ml = JSON.stringify(my)
                    sessionStorage.setItem(companyBranchId, ml)
                }
            })
        }
        let companyBranchDetails = JSON.parse(ml)
        this.branchName = companyBranchDetails.name

        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        
    },
    watch: {
        dateRange: function (newRange, oldRange) {
            if ( newRange.start!== null && newRange.end !== null) {
                this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
                this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

                this.getTransactions();
            }
        },
    },
    data() {
        return {
            branchName: '',
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
                    filewalletBalance: "branches.pdf"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        rowDataBound: function(args) {
            if (args.data['status'] == "Debit") {
                args.row.cells[5].style.color = "red";
            } 
            if (args.data['status'] == "Credit") {
                args.row.cells[5].style.color = "green";
            } 
        },
        getTransactions() {
            this.showLoader = true;
            this.axios
                .get(
                `${configObject.apiBaseUrl}/Branch/WalletTransactions/${this.$route.query.companyBranchId}?startDate=${this.startDate}&endDate=${this.endDate}`,
                configObject.authConfig()
                )
                .then(response => {
                this.showLoader = false;
                let index = 0;
                response.data.forEach(element => {
                    element.status = element.status == 'Add' ? 'Credit' : 'Debit'
                    element.index = ++index;
                    element.date = this.$moment(element.date).format(
                    "MM/DD/YYYY hh:mm A"
                    );
                    element.amount = this.convertThousand(element.amount);
                    element.walletBalance = this.convertThousand(element.walletBalance);
                });
                
                this.transactionCount = response.data.length;
                this.$refs.dataGrid.ej2Instances.setProperties({
                    dataSource: response.data
                });
                this.refreshGrid();
                })
                .catch(error => {
                    this.showLoader = false;
                });
        },
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    }
}
</script>


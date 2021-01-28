<template>
    <div>
        <POSDetailsModal :modalData="modalData" />
        <masterLayout :branchName="comapanyBranchObj.name">
            <section class=" mt-3 full__row_section">
                <div class="banner">
                <div class="row">
                    <div class="col-lg-8 remove-padding-left padding_div pr-0">
                        <div class="dashboard__card small_card align-center">
                            <div class="row">
                            <div class="col-md-8 card_inner_wrapper">
                                <h3>Hi, {{userName}}</h3>
                                <p>Get started with epump company admin platform by managing your POS Terminals</p>
                            </div>
                            <div class="col-md-4 mt-4 text-center">
                            <router-link :to="{name: 'create_terminal', query: { companyBranchId: this.$route.query.companyBranchId, companyId: this.$route.query.companyId }}" class="btn create_btn primary_btn">Create New Terminal</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="col-lg-4">
                            <div class="dashboard__card large_card">
                            <div class="small__card_content_wrapper align-items-center justify-content-center" >
                                <p class="dashboard__card__header text-white">Total number of POS Terminals</p>
                                    <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                    <img src="@/assets/img/company.png" width="40px" />
                                    </div>
                                    <div class="">
                                    <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                    >{{terminalCount}}</small>
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
                    >
                    <e-columns>
                        <e-column width="80" field="index" headerText="#"></e-column>
                        <e-column width="200" field="vendor" headerText="Vendor"></e-column>
                        <e-column width="200" field="terminalId" headerText="Terminal Id"></e-column>
                        <e-column width="200" field="serialNo" headerText="Serial No."></e-column>
                        <e-column width="200" field="serviceType" headerText="Service Type"></e-column>
                        <e-column :template="terminalTemplate" headerText="Action" width="350"></e-column>
                    </e-columns>
                </ejs-grid>
                <TableLoader :showLoader="showLoader"/>
            </div>
        </masterLayout>
    </div>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/terminalsTemplate.vue';
import POSDetailsModal from '@/components/modals/POS/posTerminalDetails.vue';
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";


import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader,
        POSDetailsModal
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    created() {
        this.$eventHub.$on('showPOSDetailsModal', (data) => {
            this.modalData = data
            this.$modal.show('POSModal')
        })
    },
    beforeDestroy() { 
        this.$eventHub.$off('showPOSDetailsModal');
    },
    mounted() {
        this.getTerminals();
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        
        const searchFun = (event) => {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            this.searchValue = value
            grid.search(value);
        }

        const companyBranchId = this.$route.query.companyBranchId;
        let ml = sessionStorage.getItem(companyBranchId);
        if (!ml) {
        let allData = localStorage.getItem("branchesList");
        let dt = JSON.parse(allData);
        dt.forEach((my, index) => {
            if (my.id === companyBranchId) {
            ml = JSON.stringify(my);
            sessionStorage.setItem(companyBranchId, ml);
            }
        });
        }
        let companyBranchDetails = JSON.parse(ml);
        this.comapanyBranchObj = companyBranchDetails;
    },
    data() {
        return {
            modalData: {},
            comapanyBranchObj: {},
            showLoader: false,
            terminalCount: 0,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            terminalTemplate: function() {
                return {
                    template: Temp
                };
            }
        }
    },
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
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
                        fileName: "branches.pdf"
                    }
                    this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getTerminals() {
            this.showLoader = true;
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Pos/Terminals?branchId=${this.$route.query.companyBranchId}`, configObject.authConfig())
                .then(res => {
                    let index = 0
                    res.data.sort((a, b) => {
                        return a.vendor.toLowerCase() > b.vendor.toLowerCase() ? 1 : b.vendor.toLowerCase() > a.vendor.toLowerCase() ? -1 : 0;
                    });
                    res.data.forEach(el => {
                        el.index = ++index;
                        el.transactionLimit = this.convertThousand(el.transactionLimit)
                        el.fee = this.convertThousand(el.fee)
                    })
                    this.terminalCount = res.data.length
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data
                    });
                    this.refreshGrid();
                    this.showLoader = false;
                })
                .catch(error => {
                    this.showLoader = false
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


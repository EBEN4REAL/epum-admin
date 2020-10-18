<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-8 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform by managing your pumps here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                           
                        </div>
                    </div>
                </div>
             </div>
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
            </div>
        </div>
        </section>
        <div class="new_row_section mt-3">
            <!-- <EjsTable :tableProps="tableProps"  /> -->
            <ejs-grid
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
                    <e-column width="40" field="index" headerText="#"></e-column>
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
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import EjsTable from '@/components/ejsTable.vue';
import Temp from '@/components/pump_status_template.vue';

import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        EjsTable
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    mounted() {
        this.getBranches();
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
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
              tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                tableData: [
                    {
                        index: 1,
                        stationName: "Abijo",
                        pumpName: "Nozzle 9",
                        deviceId: "864626046213549",
                        todayOpening: "3,353,160.75",
                        yesterdayClosing: "3,353,160.75",
                        todayClosing: "3,356,454.25",
                        difference: "0.00",
                        lastTransaction: "12 Hours ago",
                        volumeToday: "1,743.57",
                        status: "Unreacheable",
                        lastHit: "1 Hour ago",
                     },
                    {
                        index: 2,
                        stationName: "Abijo",
                        pumpName: "Nozzle 9",
                        deviceId: "864626046213549",
                        todayOpening: "3,353,160.75",
                        yesterdayClosing: "3,353,160.75",
                        todayClosing: "3,356,454.25",
                        difference: "0.00",
                        lastTransaction: "12 Hours ago",
                        volumeToday: "1,743.57",
                        status: "Unreacheable",
                        lastHit: "1 Hour ago",
                    },
                    {
                        index: 3,
                        stationName: "Abijo",
                        pumpName: "Nozzle 9",
                        deviceId: "864626046213549",
                        todayOpening: "3,353,160.75",
                        yesterdayClosing: "3,353,160.75",
                        todayClosing: "3,356,454.25",
                        difference: "0.00",
                        lastTransaction: "12 Hours ago",
                        volumeToday: "1,743.57",
                        status: "Unreacheable",
                        lastHit: "1 Hour ago",
                    },                   
                ],
                
                fileName: 'pump_status'
            },
            pumpStatusTemplate: function() {
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
                    fileName: "dealers.pdf"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getBranches() {
            this.$refs.dataGrid.ej2Instances.setProperties({
                dataSource: this.tableProps.tableData
            });
            this.refreshGrid();
        }
    }
}
</script>
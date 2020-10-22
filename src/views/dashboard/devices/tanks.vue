<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="row make-row-hundred-percent align-items-center justify-content-center" >
                            <div class="col-md-3">
                                 <div class="icon_wrapper yellow centralize icon_div_big">
                                    <i class="fa fa-laptop" aria-hidden="true" style="font-size: 35px"></i>
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Number of Tank</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">28</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Tank</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <router-link :to="{name: ''}" class="create_btn btn btn_theme">Add Firmware</router-link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
        </section>
        <div class="new_row_section mt-3">
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
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <e-column width="200" field="devices" headerText="Devices"></e-column>
                    <e-column width="200" field="lastUpdate" headerText="Last Update"></e-column>
                    <e-column width="200" field="fwVersion" headerText="FW Version"></e-column>
                    <e-column width="200" field="memoryUsage" headerText="Memory Usage"></e-column>
                    <e-column width="600" field="name" headerText="Name"></e-column>
                </e-columns>
            </ejs-grid>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import EjsTable from '@/components/ejsTable.vue';
import Temp from '@/components/devicePosTemplate.vue';

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
        this.getPos();
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
              tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                tableData: [
                    {
                        index: 1,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                    },
                    {
                        index: 2,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE", 
                    },
                    {
                        index: 3,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        
                    },
                    {
                        index: 4,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        
                    },
                    {
                        index: 5,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        
                    },
                ],
                columns: [ 
                    { 
                        field: "index", 
                        headerText: "#", 
                        width: 40, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "devices", 
                        headerText: "Devices", 
                        width: 150, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "lastUpdate", 
                        headerText: "Last Update", 
                        width: 180, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "fwVersion", 
                        headerText: "FW Version", 
                        width: 150, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "memoryUsage", 
                        headerText: "Memory Usage", 
                        width: 150, 
                        textAlign: "center"
                    },
                    { 
                        field: "name", 
                        headerText: "Name", 
                        width: 300, 
                        textAlign: "center"
                    },
                ] ,
                fileName: 'tanks'
            },
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
                    this.$refs.dataGrid.pdfExport(pdfExportProperties);
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getPos() {
            this.$refs.dataGrid.ej2Instances.setProperties({
                dataSource: this.tableProps.tableData
            });
            this.refreshGrid();
        }
    }
}
</script>
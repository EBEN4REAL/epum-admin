<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card" :style="[
                        {
                            background: '#370F70',
                        }
                        ]">
                        <div class="row make-row-hundred-percent align-items-center justify-content-center" >
                            <div class="col-md-3">
                                 <div class="icon_wrapper yellow centralize icon_div_big">
                                    <i class="fa fa-laptop" aria-hidden="true" style="font-size: 35px"></i>
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Devices  Not Pushing Ep2</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">10</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>Devices  Not Pushing Ep2</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <!-- <router-link :to="{name: ''}" class="create_btn btn btn_theme">Add Firmware</router-link> -->
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
                    <e-column width="40" field="index" headerText="#"></e-column>
                    <e-column width="200" field="deviceId" headerText="Device ID"></e-column>
                    <e-column width="200" field="fwVersion" headerText="Firmware Version"></e-column>
                    <e-column width="200" field="fwDate" headerText="Firmware Date"></e-column>
                    <e-column width="200" field="lastEp2" headerText="Last Ep2"></e-column>
                    <e-column width="200" field="memoryUsage" headerText="Memory Usage"></e-column>
                    <e-column width="200" field="branchName" headerText="Branch Name"></e-column>
                    <e-column width="350" field="address" headerText="Address"></e-column>
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
                        deviceId: "864626046222144",
                        fwVersion: "20412",
                        fwDate: "Sep 26 2019,10:18:28",
                        lastEp2: "2 Hours ago",
                        memoryUsage: "8.021749",
                        lastSeen: "18 Hours ago",
                        branchName: "Malok station - Malok Igbobo",
                        address: "Meri Junction Ikorodu, Lagos"
                    },
                    {
                        index: 2,
                        deviceId: "864626046222144",
                        fwVersion: "20412",
                        fwDate: "Sep 26 2019,10:18:28",
                        lastEp2: "5 Hours ago",
                        memoryUsage: "8.021749",
                        lastSeen: "18 Hours ago",
                        branchName: "Malok station - Malok Igbobo",
                        address: "Meri Junction Ikorodu, Lagos"
                    },
                    {
                        index: 3,
                        deviceId: "864626046222144",
                        fwVersion: "20412",
                        fwDate: "Sep 26 2019,10:18:28",
                        lastEp2: "10 Hours ago",
                        memoryUsage: "8.021749",
                        lastSeen: "18 Hours ago",
                        branchName: "Malok station - Malok Igbobo",
                        address: "Meri Junction Ikorodu, Lagos"
                    },
                    {
                        index: 4,
                        deviceId: "864626046222144",
                        fwVersion: "20412",
                        fwDate: "Sep 26 2019,10:18:28",
                        lastEp2: "19 Hours ago",
                        memoryUsage: "8.021749",
                        lastSeen: "18 Hours ago",
                        branchName: "Malok station - Malok Igbobo",
                        address: "Meri Junction Ikorodu, Lagos"
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
                    { 
                        field: "state", 
                        headerText: "State", 
                        width: 100, 
                        textAlign: "center"
                    },
                    { 
                        field: "firmware", 
                        headerText: "Firmware Update", 
                        width: 300, 
                        textAlign: "center"
                    },
                    { 
                        headerText: "Action", 
                        width: 500, 
                        textAlign: "center",
                        template:   () => {
                            return {
                                template: Temp
                            }
                        }
                    },  
                ] ,
                fileName: 'pos'
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
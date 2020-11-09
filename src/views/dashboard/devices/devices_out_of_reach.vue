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
                            <p>Get started with epump company admin platform by managing devices out of reach here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                          
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of Devices out of Reach</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{devicesOutOfReachCount}}</small>
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
                    <e-column width="200" field="deviceId" headerText="Device Id"></e-column>
                    <e-column width="250" field="branchName" headerText="Branch Name"></e-column>
                    <e-column width="200" field="firmWareVersion" headerText="Firmware Version"></e-column>
                    <e-column width="200" field="firmWareDate" headerText="Firmware Date"></e-column>
                    <e-column width="200" field="memoryUsage" headerText="Memory Usage"></e-column>
                    <e-column width="200" field="lastDate" headerText="Last Seen"></e-column>
                    <!-- <e-column width="200" field="nozzles" headerText="Display Name"></e-column> -->
                    <e-column width="350" field="address" headerText="Address"></e-column>
                    <e-column width="10"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"  />
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
// import Temp from '@/components/devicePosTemplate.vue';
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
    mounted() {
        this.getDevicesNotPusingEp2()
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
            },
            devicesOutOfReachCount: 0,
            showLoader: false,
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
                    this.$refs.dataGrid.pdfExport(pdfExportProperties);
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getDevicesNotPusingEp2() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Admin/DeviceOutOfReach`, configObject.authConfig)
                .then(res => {
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
                        el.index = ++index;
                        el.address = `${el.street} ${el.city}, ${el.state}`
                        el.lastDate = this.timeSince(new Date(el.lastDate))
                    })
                    this.devicesOutOfReachCount = res.data.length
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

        timeSince(date) {

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " year ago" : " years ago");
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " month ago" : " months ago");
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " day ago" : " days ago");
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " hour ago" : " hours ago");
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " minute ago" : " minutes ago");
            }
            return Math.floor(seconds) + (Math.floor(interval) == 1 ? " second ago" : " seconds ago");
        }
    }
}
</script>
<template>
    <masterLayout>
         <section class=" mt-3 full__row_section">
            <div class="banner">
                <div class="row hundred-percent-height align-items-center">
                    <div class="col-lg-12">
                        <div class="dashboard__card large_card"  :style="[
                                    {
                                    backgroundImage: `linear-gradient(rgb(37, 37, 37 , 0.9), rgb(37, 37, 37 , 0.9)), url(${backgroundUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                    }
                                ]">
                                <div class="row  hundred-percent-height align-items-center">
                                    <div class="col-md-12">
                                         <div class="small__card_content_wrapper  " >
                                            <h4 class="yellow_text">{{tankDetailObj.tankName}} Calibration for {{tankDetailObj.branchName}}</h4>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
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
                    <e-column width="300" field="height" headerText="height(mm)" textAlign="center"></e-column>
                     <e-column width="300" field="volume" headerText="Volume(Ltrs)" textAlign="center"></e-column>
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
import Jquery from 'jquery';
let $ = Jquery;
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import TankCalibrationTemplate from '@/components/Templates/tankCalibrationTemplate.vue';



export default {
    components: {
        masterLayout,
        TableLoader
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    }, 
    data() {
        return {
            showLoader: false,
            backgroundUrl,
            tankDetailObj: {},
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
        }
    },
    watch: {
       
    },
    mounted() {
        this.getTankCalibration()
        this.tankId = this.$route.query.tankId;
        let ml = sessionStorage.getItem(this.tankId);
        if (!ml) {
        let allData = localStorage.getItem("tankSalesList");
        let dt = JSON.parse(allData);
        dt.forEach((my, index) => {
            if (my.tankId == this.tankId) {
            ml = JSON.stringify(my);
            sessionStorage.setItem(this.tankId, ml);
            }
        });
        }
        let tankDetails = JSON.parse(ml);
        this.tankDetailObj = tankDetails;
        console.log(this.tankDetailObj)
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
        
        refreshGrid() {
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
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getTankCalibration() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Calibration/${this.$route.query.tankId}`, configObject.authConfig)
                .then(res => {
                    console.log(res.data)
                    let index = 0
                    res.data.forEach(el => {
                        el.index = ++index
                        el.volume = this.convertThousand(el.volume)
                    })
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
    }
}
</script>
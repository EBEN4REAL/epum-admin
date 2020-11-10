<template>
   <div>
        <EditTankCalibration :calibrationObj="calibrationObj" />
        <UploadCalibration :tankId="tankDetailObj.tankId"/>
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
        <section class="top_section_row mt-3 ">
            <div class="row  mt-3 align-items-center py-3 ">
                <div class="col-md-8">
                    <!-- <span class="pl-3 ">Pump Variance Report on <strong>{{startDate}}</strong> for <strong>{{companyName}}</strong></span> -->
                </div>
                <div class="col-md-4 text-right">
                   <button class="btn details_btn mr-3" @click="uploadCalibration">
                        Upload Calibration
                    </button>
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
                    <e-column width="300" field="height" headerText="Height(mm)" textAlign="center"></e-column>
                     <e-column width="300" field="volume" headerText="Volume(Ltrs)" textAlign="center"></e-column>
                     <e-column :template="TankCalibrationTemp" headerText="Action" width="200"></e-column>
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
import configObject from "@/config";
import backgroundUrl from "@/assets/img/Tankimage.png";
import Jquery from 'jquery';
let $ = Jquery;
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import TankCalibrationTemplate from '@/components/Templates/tankCalibrationTemplate.vue';
import EditTankCalibration from '@/components/modals/TankCalibration/editTankCalibration.vue';
import UploadCalibration from '@/components/modals/TankCalibration/uploadCalibration.vue';


export default {
    components: {
        masterLayout,
        TableLoader,
        EditTankCalibration,
        UploadCalibration
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    }, 
    data() {
        return {
            showLoader: false,
            backgroundUrl,
            tankDetailObj: {},
            calibrationObj: {},
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            TankCalibrationTemp: () => {
                return {
                    template: TankCalibrationTemplate
                };
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
        this.$eventHub.$on("refreshCalibrationList", () => {
            this.getTankCalibration()
        });
    },
    created() {
        this.$eventHub.$on('editTankCalibration', (calibrationObj) => { 
            this.editcalibration(calibrationObj)
        })
        this.$eventHub.$on('deleteCalibration', (id) => { 
            this.deleteCalibration(id)
        })
    },
    beforeDestroy() { 
        this.$eventHub.$off('editTankCalibration');
        this.$eventHub.$off('deleteCalibration');
    },
    methods: {
        editcalibration(calibrationObj) {
            this.calibrationObj = calibrationObj
            this.$modal.show('editTankCalibration')
        },
        uploadCalibration() {
            this.$modal.show('uploadTankCalibration')
        },
        deleteCalibration(id) {
            this.calibrationObj = calibrationObj
            this.$modal.show('editTankCalibration')
        },

        refreshGrid() {
            this.$refs.dataGrid.refresh();
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
        deleteCalibration(id) {
            let resp = confirm("Are you sure want to delete this calibration?");
            if (resp) {
                $(".loader").show();
                console.log( `/Calibration/RemoveCalibration/${id}`)
                this.axios
                .delete(
                    `/Calibration/RemoveCalibration/${id}`,
                    configObject.authConfig
                )
                .then((res) => {
                    this.$toast("Calibration Deleted Successfully", {
                        type: "success",
                        timeout: 3000,
                    });
                    $(".loader").hide();
                    this.$eventHub.$emit("refreshCalibrationList");
                    this.getTankCalibration()
                })
                .catch((error) => {
                    $(".loader").hide();
                    this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000,
                    });
                });
            }
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
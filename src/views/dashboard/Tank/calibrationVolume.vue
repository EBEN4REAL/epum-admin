<template>
<div>
    <CalibrationVolume :calibrationObj="calibrationObj" />
    <masterLayout>
   
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-4 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row ">
                        <div class="col-md-10 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Check tank Volume Calibration here :)</p>
                        </div>
                        <div class="col-md-2  text-center">
                            <img src="@/assets/img/company.png" width="40px" />
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-8">
                     <div class="small_card product_details_card audit-sales dumpdata_card ">
                        <div class="row p-4 align-items-center hundred-percent-height">
                        <div class="col-md-3">
                            <label class="text-white">Tank ID</label><br>
                            <div class="input__block input_margin">
                                <input type="text" placeholder="Tank ID" class="" v-model="tankId" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label class="text-white">Product Height</label><br>
                            <div class="input__block input_margin">
                                    <input type="number" placeholder="Height" class="" v-model="productHeight"  />
                                </div>
                            </div>
                        <div class="col-md-3">
                            <label class="text-white">Water Height</label><br>
                            <div class="input__block input_margin">
                                <input type="number" placeholder="Volume" class="" v-model="waterHeight" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="text-center">
                                <label class="text-white"></label><br>
                                <button class="btn btn-success text-white"
                                @click="getVolumeCalibration" 
                                :disabled="isButtonDisabled ? true : null"
                                :style="[
                                    isButtonDisabled
                                    ? { cursor: 'not-allowed' }
                                    : { cursor: 'pointer' }
                                ]"
                                ><i class="fa fa-search mr-2"></i>Submit
                                <img
                                    src="@/assets/img/git_loader.gif"
                                    style="display:none"
                                    width="15px"
                                    class="ml-3 loader"
                                />
                                </button>
                            </div>
                        </div>

                        </div>
                    </div>
              </div>
            </div>
         </div>
        </section>
        <section class="new_row_section mt-3">
            <div class="image_container mt-4" style="margin: 0 auto; width: 50%">
                <img src="@/assets/img/auditsale.png" alt=""  style="width: 100%;" />
            </div>
        </section>
  </masterLayout>
</div>

</template>

<script>
import Vue from "vue";
import CalibrationVolume from '@/components/modals/TankCalibration/checkVolumecalibration.vue';
import masterLayout from "@/views/dashboard/masterLayout";
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import TimestampModal from '@/components/modals/timestamp.vue';
import Jquery from 'jquery';
let $ = Jquery;
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";


export default {
  components: {
    masterLayout,
    TableLoader,
    CalibrationVolume
  },
   provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
  data() {
    return {
        productHeight: null,
        waterHeight: null,
        userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
        tableProps: {
            pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
            toolbar: ["ExcelExport", "PdfExport", "Search"],
            search: { operator: "contains", ignoreCase: true },
        },
       
        isButtonDisabled: false,
        showLoader: false,
        tankId: null,
        calibrationObj: {}
    };
  },
  mounted() {
    this.tankId = this.$route.query.tankId
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
  computed: {
    userName() {
        return `${this.userDetails.firstName} ${this.userDetails.lastName}`
    }
  },
  methods: {
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    getVolumeCalibration() {
         if (!this.tankId) {
            this.$toast('Please input a tank ID', {
                type: "error",
                timeout: 3000,
            });
            return
        }
        if (!this.productHeight) {
            this.$toast('Please input a product height', {
                type: "error",
                timeout: 3000,
            });
            return
        }

        if (!this.waterHeight) {
            this.$toast('Please input a water height', {
                type: "error",
                timeout: 3000,
            });
            return
        }
        this.isButtonDisabled = true
        this.axios
            .get(`${configObject.apiBaseUrl}/Calibration/Volume/${this.tankId}/${parseInt(this.productHeight)}/${parseInt(this.waterHeight)}`, configObject.authConfig)
            .then(res => {
                this.showSpinner = false
                this.isButtonDisabled = false
                this.calibrationObj = res.data
                this.$modal.show('volumeCalibration')
            })
            .catch(error => {
                this.showSpinner = false
                this.isButtonDisabled = false
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000
                });
            });
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

  },
};
</script>

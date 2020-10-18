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
                                <div class="col-md-4 text-center">
                                    <router-link :to="{name:'installedTanks', query: {companyBranchId: this.$route.query.branchId}}">
                                          <i class="fa fa-chevron-circle-left" aria-hidden="true" style="color: white; font-size: 28px"></i>
                                    </router-link>
                                </div>
                                <div class="col-md-3">
                                      <div class="small__card_content_wrapper  " >
                                        <h4 class="yellow_text">Tank Dippings for ({{tankDetailsObj.name}})</h4>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <vue-ctk-date-time-picker
                                        v-model="dateRange"
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
    <div class="full__row_section mt-3">
      <div class="row">
        <div class="col-lg-8">
          <div class="pad_div">
            <div class="text-left tabs__lists">
              <div class="new_row_section mt-3">
                 <ejs-grid
                  v-show="!showLoader"
                  ref="dataGrid"
                  :created="refreshGrid"
                  :allowPaging="false"
                  :allowSorting="true"
                  :pageSettings="tableProps.pageSettings"
                  :toolbar="tableProps.toolbar"
                  :searchSettings="tableProps.search"
                  :allowExcelExport="true"
                  :allowPdfExport="true"
                  :toolbarClick="toolbarClick"
                  :key="1"
                  >
                  <e-columns>
                      <e-column width="60" field="index" headerText="Index"></e-column>
                      <e-column width="200" field="actualVolume" headerText="Actual Volume(Ltrs)"></e-column>
                      <e-column width="200" field="date" headerText="Date"></e-column>
                  </e-columns>
              </ejs-grid>
              <TableLoader :showLoader="showLoader"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 div ep_card card_height mail_card mb-5">
          <div class="pad_div">
            <div class="mb-3 tabs__lists">
              <h5>Add Tank Dip</h5>
              <form>
                <div class="text-center">
                  <div class="align-items-center mt-3">
                    <div class="input__block">
                      <input type="number" placeholder="Tank Volume" class="" v-model="volume" />
                    </div>
                  </div>
                  <div class="align-items-center mt-3">
                    <div class="input__block">
                       <!-- <vue-ctk-date-time-picker
                          v-model="dateRange"
                          :max-date="maxDate"
                          :onlyDate="true"
                          :autoClose="true"
                          color="#370F70"
                          format="DDMMYYYY"
                          formatted="DD/MM/YYYY"
                          label="Recorded on"
                      /> -->
                      <input type="date"  v-model="date" placeholder="Recorded on" />
                    </div>
                  </div>
                  <div class="text-center mt-3">
                    <button class="btn btn_theme" @click="addTankDipping"
                      :disabled="isButtonDisabled ? true : null"
                      :style="[
                          isButtonDisabled
                          ? { cursor: 'not-allowed' }
                          : { cursor: 'pointer' }
                      ]"
                      >Add
                      <img
                          src="@/assets/img/git_loader.gif"
                          style="display:none"
                          width="35px"
                          class="ml-3 loader"
                      />
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/Tankimage.png";
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";



import {
  Page,
  Sort,
  Toolbar,
  Search,
  ExcelExport,
  PdfExport,
} from "@syncfusion/ej2-vue-grids";
import Jquery from "jquery";
let $ = Jquery;

export default {
  components: {
    masterLayout,
    TableLoader
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport],
  },
  watch: {
    dateRange: function (newRange, oldRange) {
        if ( newRange.start!== null && newRange.end !== null) {
            this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
            this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

            this.getTankDip();
        }
    },
  },
  mounted() {
    this.getTankDip()
    $(".e-input").keyup(function(e) {
        searchFun(e);
    });
    function searchFun(event) {
        var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
        var value = event.target.value;
        grid.search(value);
    }
    this.tankId = this.$route.query.tankId;
    let ml = sessionStorage.getItem(this.tankId);
    if (!ml) {
      let allData = localStorage.getItem("tanksList");
     let dt = JSON.parse(allData);
      dt.forEach((my, index) => {
        if (my.id === this.tankId) {
          ml = JSON.stringify(my);
          sessionStorage.setItem(this.tankId, ml);
        }
      });
    }
    let tankDetails = JSON.parse(ml);
    this.tankDetailsObj = tankDetails;
    
  },
  data() {
    return {
      backgroundUrl,
      volume: '',
      maxDateForm: this.$moment(new Date()).format("YYYY-MM-DD"),
      dateRange: this.startDate,
      pluginStartDate: this.$moment().format("D-M-YYYY"),
      startDate: this.$moment().format("MMMM D, YYYY"),
      showLoader: false,
      tableProps: {
        pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
        toolbar: ["ExcelExport", "PdfExport", "Search"],
        search: { operator: "contains", ignoreCase: true },
      },
      tankDetailsObj: {},
      isButtonDisabled: false,
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
      date: ""
    };
  },
  methods: {
    convertThousand(request) {
        if (!isFinite(request)) {
            return "0.00";
        }
        return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
     getTankDip() {
        this.showLoader = true;
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Tank/TankDip/${this.$route.query.branchId}/${this.$route.query.tankId}?startDate=${this.startDate}&endDate=${this.endDate}`, configObject.authConfig)
            .then(res => {
              console.log(res.data)
                let index = 0
                res.data.forEach(el => {
                    el.index = ++index;
                    el.date = this.$moment(el.date).format(
                      "MM-DD-YYYY "
                    );
                    el.actualVolume = this.convertThousand(el.actualVolume)
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
    addTankDipping(event){
      event.preventDefault();
      if(!this.volume) {
          this.$toast("Volume  Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      const data = {
        branchId: this.$route.query.branchId,
        tankId: this.$route.query.tankId,
        currentVolume: this.volume,
        start: this.date
      }
      
      this.isButtonDisabled = true;

      $('.loader').show();
      this.axios.post(`${configObject.apiBaseUrl}/Tank/TankDip`,data, configObject.authConfig)
          .then(res => {
              this.$toast("Tank Dip Added successfully", {
                  type: "success",
                  timeout: 3000
              });
              this.isButtonDisabled = false;
              this.volume = null
              this.getTankDip()
              $('.loader').hide();
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast(error.response.data.message, {
                  type: "error",
                  timeout: 3000
              });
          });
  },
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    toolbarClick(args) {
      switch (args.item.text) {
        case "PDF Export":
          let pdfExportProperties = {
            pageOrientation: "Landscape",
            tankDippings: "branches.pdf",
          };
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
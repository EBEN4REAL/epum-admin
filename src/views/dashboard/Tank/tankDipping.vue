<template>
  <masterLayout>
    <section
      class="mt-3 full__row_section banner-gradient"
      :style="[
        {
          backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
      ]"
    >
      <div
        class="row align-items-center justify-content-center hundred-percent-height"
      >
        <div class="col-md-12">
          <div class="text-center">
            <h5 class="title">TANK DIPPINGS (AGO TANK 1)</h5>
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
                  :dataSource="tableProps.tableData"
                  v-cloak
                >
                  <e-columns>
                    <e-column
                      width="40"
                      field="index"
                      headerText="#"
                    ></e-column>
                    <e-column
                      width="200"
                      field="date"
                      headerText="Date"
                    ></e-column>
                    <e-column
                      width="200"
                      field="volumeTank"
                      headerText="Volume Tank"
                    ></e-column>
                    <e-column
                      width="200"
                      field="calculatedTankVolume"
                      headerText="Calculated Tank Volume"
                    ></e-column>
                    <e-column
                      width="200"
                      field="tankVolumeDifference"
                      headerText="Tank Volume Difference"
                    ></e-column>
                    <e-column
                      width="200"
                      field="remark"
                      headerText="Remark"
                    ></e-column>
                    <e-column
                      width="200"
                      field="recordedOn"
                      headerText="Recorded On"
                    ></e-column>
                    <e-column
                      width="200"
                      field="volumeIn"
                      headerText="Volume In"
                    ></e-column>
                    <e-column
                      width="200"
                      field="volumeOut"
                      headerText="Volume Out"
                    ></e-column>
                  </e-columns>
                </ejs-grid>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 div ep_card card_height mail_card mb-5">
          <div class="pad_div">
            <div class="mb-3 tabs__lists">
              <h5>Tank Dip</h5>
              <form>
                <div class="text-center">
                  <div class="align-items-center mt-3">
                    <div class="input__block">
                      <input type="text" placeholder="Tank Volume" class="" />
                    </div>
                  </div>
                  <div class="align-items-center mt-3">
                    <div class="input__block">
                      <input type="date" placeholder="Recorded On" class="" />
                    </div>
                  </div>
                  <div class="text-center mt-3">
                    <button class="btn btn_theme">Submit</button>
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
import backgroundUrl from "@/assets/img/bg__card.png";
import EjsTable from "@/components/ejsTable.vue";

import {
  Page,
  Sort,
  Toolbar,
  Search,
  ExcelExport,
  PdfExport,
  DatePickerEditCell,
} from "@syncfusion/ej2-vue-grids";
import Jquery from "jquery";
let $ = Jquery;

export default {
  components: {
    masterLayout,
    EjsTable,
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport],
  },
  mounted() {
    this.getBranches();
    $(".e-input").keyup(function (e) {
      searchFun(e);
    });
    function searchFun(event) {
      var grid = document.getElementsByClasscalculatedTankVolume("e-grid")[0]
        .ej2_instances[0];
      var value = event.target.value;
      grid.search(value);
    }
  },
  data() {
    return {
      backgroundUrl,
      tableProps: {
        pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
        toolbar: ["ExcelExport", "PdfExport", "Search", "Date"],
        search: { operator: "contains", ignoreCase: true },
        tableData: [
          {
            index: 1,
            transactionDate: " oil & Gas",
            volumeTank: "",
            calculatedTankVolume: "",
            tankVolumeDifference: "",
            remark: "",
            recordedOn: "",
          },
          {
            index: 2,
            transactionDate: "",
            volumeTank: "",
            calculatedTankVolume: "",
            tankVolumeDifference: "",
            remark: "",
            recordedOn: "",
          },
          {
            index: 3,
            transactionDate: "",
            volumeTank: "",
            calculatedTankVolume: "",
            tankVolumeDifference: "",
            remark: "",
            recordedOn: "",
          },
        ],
      },
    };
  },
  methods: {
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    toolbarClick(args) {
      switch (args.item.text) {
        case "PDF Export":
          let pdfExportProperties = {
            pageOrientation: "Landscape",
            filecalculatedTankVolume: "branches.pdf",
          };
          this.$refs.dataGrid.pdfExport();
          break;
        case "Excel Export":
          this.$refs.dataGrid.excelExport();
          break;
      }
    },
    getBranches() {
      this.$refs.dataGrid.ej2Instances.setProperties({
        dataSource: this.tableProps.tableData,
      });
      this.refreshGrid();
    },
  },
};
</script>
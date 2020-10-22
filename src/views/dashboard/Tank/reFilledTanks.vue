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
                                    <img src="@/assets/img/company_icon.png"  width="40" />
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Number of Detected Tank</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">66</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-7 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>DETECTED TANK FILLS FOR AL-ISTIJABAH OIL & GAS (AL-ISTIJABAH OIL & GAS)</h3>
                        </div>
                        <div class="col-md-4 mt-4">
                          <div class="input__block mt-3">
                               <input type="date" date="" id="">
                          </div>
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
                :allowPaging="false"
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                :actionBegin='actionHandler'
                >
                <e-columns>
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <e-column width="200" field="date" headerText="Date"></e-column>
                    <e-column width="200" field="tankName" headerText="Tank Name"></e-column>
                    <e-column width="200" field="productName" headerText="Product Name"></e-column>
                    <e-column width="200" field="initialReading" headerText="Initial Reading"></e-column>
                    <e-column width="200" field="finalReading" headerText="Final Reading"></e-column>
                    <e-column width="200" field="volume" headerText="Volume"></e-column>
                    <e-column width="200" field="truck" headerText="Truck"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>

            <div class="mt-3" style="margin:  0 auto">
                <Paginator 
                    v-show="!showLoader"
                    :total-pages="totalPages"
                    :per-page="pageSize"
                    :current-page="currentPage"
                    @pagechanged="onPageChange"
                    @getPageSize="getPageSize"
                    :pageSize="pageSize"
                />
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
    backgroundUrl,
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
      var grid = document.getElementsByClassproductName("e-grid")[0]
        .ej2_instances[0];
      var value = event.target.value;
      grid.search(value);
    }
  },
  data() {
    return {
      tableProps: {
        pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
        toolbar: ["ExcelExport", "PdfExport", "Search", "Date"],
        search: { operator: "contains", ignoreCase: true },
        tableData: [
          {
            index: 1,
            date: "",
            tankName: "",
            productName: "",
            initialReading: "",
            initialReading: "",
            volume: "",
            truck: "",
          },
          {
            index: 2,
            date: "",
            tankName: "",
            productName: "",
            initialReading: "",
            finalReading: "",
            volume: "",
            truck: "",
          },
          {
            index: 3,
            date: "",
            tankName: "",
            productName: "",
            initialReading: "",
            initialReading: "",
            volume: "",
            truck: "",
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
            fileproductName: "branches.pdf",
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
<template>
  <masterLayout>
    <section class="mt-3 full__row_section">
      <div class="banner">
        <div class="row">
          <div class="col-lg-4">
            <div class="dashboard__card large_card">
              <div
                class="row make-row-hundred-percent align-items-center justify-content-center"
              >
                <div class="col-md-3">
                  <div class="icon_wrapper yellow centralize icon_div_big">
                    <i
                      class="fa fa-laptop"
                      aria-hidden="true"
                      style="font-size: 35px"
                    ></i>
                  </div>
                </div>
                <div class="col-md-7 remove-padding-left">
                  <div class="text-center">
                    <h5 class="text-white font-weight">Devices Offline</h5>
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
                  <h3>List of Devices Offline</h3>
                </div>
                <div class="col-md-3 mt-4">
                  <!-- <router-link :to="{name: ''}" class="create_btn btn btn_theme">Add Firmware</router-link> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 remove-padding-left padding_div pr-0">
            <div class="dashboard__card small_card align-center">
              <div class="row">
                <div class="col-md-8 card_inner_wrapper">
                  <h3>Hi, {{ userName }}</h3>
                  <p>
                    Get started with epump company admin platform by managing
                    your offline devices here
                  </p>
                </div>
                <div class="col-md-4 mt-4 text-center">
                  <!-- <router-link :to="{name: 'create_companies'}" class="btn create_btn primary_btn">Create Company</router-link> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="dashboard__card large_card">
              <div
                class="small__card_content_wrapper align-items-center justify-content-center"
              >
                <p class="dashboard__card__header text-white">
                  Total number of Offline Devices
                </p>
                <div
                  class="icon_wrapper centralize text-center"
                  style="margin-top: -12px"
                >
                  <img src="@/assets/img/company.png" width="40px" />
                </div>
                <div class="">
                  <small
                    class="dashboard__card__header_bottom text-white font-weight-bold"
                    >4</small
                  >
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
        :dataSource="tableProps.tableData"
        v-cloak
        :columns="tableProps.columns"
      >
        <e-columns>
          <e-column width="40" field="index" headerText="#"></e-column>
          <e-column
            width="200"
            field="branchName"
            headerText="Branch Name"
          ></e-column>
          <e-column
            width="200"
            field="displayName"
            headerText="Display Name"
          ></e-column>
          <e-column
            width="200"
            field="deviceId"
            headerText="Device Id"
          ></e-column>
          <e-column
            width="200"
            field="offlinePeriod"
            headerText="Offline period"
          ></e-column>
          <e-column width="350" field="status" headerText="Status"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  </masterLayout>
</template>
<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import EjsTable from "@/components/ejsTable.vue";
import Temp from "@/components/devicePosTemplate.vue";

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
    EjsTable,
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport],
  },
  mounted() {
    this.getPos();
    $(".e-input").keyup(function (e) {
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
      userDetails: localStorage.getItem("adminUserDetails")
        ? JSON.parse(localStorage.getItem("adminUserDetails"))
        : null,
      tableProps: {
        pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
        toolbar: ["ExcelExport", "PdfExport", "Search"],
        search: { operator: "contains", ignoreCase: true },
        tableData: [
          {
            index: 1,
            branchName: "Abeokuta",
            displayName: "AGO 1",
            deviceId: "862273049192933",
            offlinePeriod:
              "Started 9 Hours ago and Currently Reporting Offline!",
            status: "Offline",
          },
          {
            index: 2,
            branchName: "Agungi",
            displayName: "AGO 2",
            deviceId: "862273049192933",
            offlinePeriod:
              "Started 4 Hours ago and Currently Reporting Offline!",
            status: "Offline",
          },
          {
            index: 3,
            branchName: "Alapere",
            displayName: "PMS 1",
            deviceId: "862273049192933",
            offlinePeriod:
              "Started 5 Hours ago and Currently Reporting Offline!",
            status: "Offline",
          },
          {
            index: 4,
            branchName: "Lekki",
            displayName: "PMS 2",
            deviceId: "862273049192933",
            offlinePeriod:
              "Started 8 Hours ago and Currently Reporting Offline!",
            status: "Offline",
          },
        ],
        columns: [
          {
            field: "index",
            headerText: "#",
            width: 40,
            textAlign: "center",
          },
          {
            field: "devices",
            headerText: "Devices",
            width: 150,
            textAlign: "center",
          },
          {
            field: "lastUpdate",
            headerText: "Last Update",
            width: 180,
            textAlign: "center",
          },
          {
            field: "fwVersion",
            headerText: "FW Version",
            width: 150,
            textAlign: "center",
          },
          {
            field: "memoryUsage",
            headerText: "Memory Usage",
            width: 150,
            textAlign: "center",
          },
          {
            field: "name",
            headerText: "Name",
            width: 300,
            textAlign: "center",
          },
          {
            field: "state",
            headerText: "State",
            width: 100,
            textAlign: "center",
          },
          {
            field: "firmware",
            headerText: "Firmware Update",
            width: 300,
            textAlign: "center",
          },
          {
            headerText: "Action",
            width: 500,
            textAlign: "center",
            template: () => {
              return {
                template: Temp,
              };
            },
          },
        ],
        fileName: "pos",
      },
    };
  },
  computed: {
    userName() {
      return `${this.userDetails.firstName} ${this.userDetails.lastName}`;
    },
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
            fileName: "branches.pdf",
          };
          this.$refs.dataGrid.pdfExport(pdfExportProperties);
          break;
        case "Excel Export":
          this.$refs.dataGrid.excelExport();
          break;
      }
    },
    getPos() {
      this.$refs.dataGrid.ej2Instances.setProperties({
        dataSource: this.tableProps.tableData,
      });
      this.refreshGrid();
    },
  },
};
</script>
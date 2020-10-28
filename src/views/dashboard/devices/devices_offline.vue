<template>
  <masterLayout>
    <section class="mt-3 full__row_section">
      <div class="banner">
        <div class="row">
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
                  Total number of Devices Offline
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
                    >{{offlineCount}}</small
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
        :dataSource="tableProps.tableData"
        v-cloak
        :columns="tableProps.columns"
         :rowDataBound='rowDataBound'
      >
        <e-columns>
          <e-column width="80" field="index" headerText="#"></e-column>
          <e-column
            width="200"
            field="deviceId"
            headerText="Device Id"
          ></e-column>
          <e-column
            width="200"
            field="pumps"
            headerText="Display Name"
          ></e-column>
          <e-column
            width="200"
            field="branchName"
            headerText="Branch Name"
          ></e-column>
          <e-column
            width="200"
            field="date"
            headerText="Date/Time"
          ></e-column>
          <e-column
            width="100"
            field="status"
            headerText="Status"
          ></e-column>
          <e-column
            width="200"
            :template="buttonsTemplate"
            headerText="Actions"
          ></e-column>
          <e-column width="10"></e-column>
        </e-columns>
      </ejs-grid>
      <TableLoader :showLoader="showLoader"  />
    </div>
  </masterLayout>
</template>
<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
// import Temp from "@/components/devicePosTemplate.vue";
import TableLoader from "@/components/tableLoader/index";
import configObject from "@/config";

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
  mounted() {
    this.getOfflineDevices()
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
      showLoader: false,
      offlineCount: 0,
      tableProps: {
        pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
        toolbar: ["ExcelExport", "PdfExport", "Search"],
        search: { operator: "contains", ignoreCase: true },
      },
      buttonsTemplate: function() {
          return {
            template: Vue.component("columnTemplate", {
              template:
                `<div> 
                <button class="btn details_btn mr-3" style="width: 150px; height: 35px" v-on:click="resolve(data)">Resolve</button>
                </div>`,
              data: function() {
                return {
                  data: {}
                };
              },
              methods: {
                resolve(data) {
                  this.$eventHub.$emit("resolve", data);
                }
              }
            })
          };
      },
    };
  },
  created() {
    this.$eventHub.$on("resolve", (data) => {
      this.resolvePumpStatus(data);
    });
  },
  computed: {
    userName() {
      return `${this.userDetails.firstName} ${this.userDetails.lastName}`;
    },
  },
  methods: {
     rowDataBound: function(arging) {
       let text
       arging.row.addEventListener("mouseover", args => {
        text = arging.row.children[3].innerHTML
        arging.row.children[3].innerHTML = 'thankful'
      });

      arging.row.addEventListener("mouseleave", args => {
        arging.row.children[3].innerHTML = text
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
          };
          this.$refs.dataGrid.pdfExport(pdfExportProperties);
          break;
        case "Excel Export":
          this.$refs.dataGrid.excelExport();
          break;
      }
    },
    resolvePumpStatus(data) {
        let resp = confirm("Are you sure want to resolve this device?");
        if (!resp) {
          return 
        }
        
        this.axios.post(`${configObject.apiBaseUrl}/Admin/ResolveOffline?id=${parseInt(data.deviceId)}`, {}, configObject.authConfig)
            .then(res => {
                this.$toast("Successfully resolved device", {
                    type: "success",
                    timeout: 3000
                });
                this.getOfflineDevices()
            })
            .catch(error => {
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000
                });
            });
    },
    getOfflineDevices() {
        this.showLoader = true
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Admin/OfflinePump`, configObject.authConfig)
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
                    el.date = this.$moment(el.date).format("MM/DD/YYYY hh:mm A");
                    el.index = ++index;
                    el.status = 'Offline'
                })
                this.offlineCount = res.data.length
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
  },
};
</script>
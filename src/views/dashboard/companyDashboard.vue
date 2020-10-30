<template>
  <masterLayout>
    <div class="row">
      <div class="col-lg-9 col-md-6">
        <div class="new_row_section">
          <div class="small_card product_details_card mt-3">
            <div class="title font-weight-bold">
              <h4>Dashboard</h4>
              <hr />
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-2 border-right">
                <div class="text-center mt-3">
                  <img src="@/assets/img/oil-truck (-2.png" width="40px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">Companies</h6>

                  <div class="mb-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                    >
                      Ltrs
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 border-right">
                <div class="text-center mt-3">
                  <img src="@/assets/img/oil-truck (-1.png" width="40px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">Dealers</h6>

                  <div class="mb-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                      >Ltrs
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2">
                <div class="text-center">
                  <img src="@/assets/img/oil-truck (1).png" width="40px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">Outlets</h6>

                  <div class="mb-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                      >Ltrs
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pad_div">
        <div class="text-left tabs__lists">
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
               <e-column :template="companies_image" width="100" headerText="Logo"></e-column>
                    <e-column width="200" field="name" headerText="Company Name"></e-column>
                    <e-column width="200" field="country" headerText="Country"></e-column>
                    <e-column width="200" field="city" headerText="City"></e-column>
            </e-columns>
          </ejs-grid>
          <TableLoader :showLoader="showLoader" />
        </div>
        </div>

        <div class="text-center pb-4">
          <router-link :to="{name: 'list_of_companies'}" class="btn btn_theme">See All</router-link>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="branch_card pl-3 position-fixed company-dashboard-board">
          <div class="">
            <div class="userdetails">
              <p class="mt-3">Hello,</p>
              <h4>{{userDetails.firstName}}!</h4>
              <span>You can now create company from the dashboard</span>
               <router-link :to="{name: 'create_companies'}" class="btn purple-btn p-2">Create Company</router-link>
            </div>
            <div
              class="small__card_content_wrapper small_card small__card_content_wrapper mt-4"
            >
            <div class="map-device-company d-flex p-1 py-3">
              <div class="text-white">
                <p>Manage Users <br>here</p>
                <span>Quick access to manage users</span>
              </div>
              <div class="">
                 <router-link :to="{name: 'manage_users'}" class="btn map-device-company-btn">Manage Users</router-link>
              </div>
            </div>
            </div>
            <div class="pumps-company">
              <div class="d-flex justify-content-between mt-3">
                <p>Offline Pumps</p>
                <router-link
                :to="{
                  name: 'devices_offline'
                }"
                class="text-decoration-none btn-pump"
                >See All >></router-link
              >
            </div>
              </div>
            </div>
            <div class="offline-pump-card p-2">
              <div class="d-flex justify-content-center">
                <div class="pumps-image">
                  <img src="@/assets/img/fuel.png" alt="" width="30" />
                </div>
                <div class="pump-location pl-3">
                  <p>Abeokuta</p>
                  <p class="pump-name">AGO</p>
                  <small>Last seen: <span> 2 days ago </span></small>
                </div>
                <div class="mt-3 pl-2">
                  <router-link
                :to="{
                  name: 'devices_offline',
                }"
                class="text-decoration-none resolve-btn"
                >Resolve</router-link
              >
                </div>
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
import Templates from '@/components/Templates/imageTemplates/companies_image.vue';
import configObject from "@/config";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import TableLoader from "@/components/tableLoader/index";
import {
  Page,
  Sort,
  Toolbar,
  Search,
  ExcelExport,
  PdfExport,
} from "@syncfusion/ej2-vue-grids";

export default {
  components: {
    masterLayout,
    TableLoader
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport],
  },
  data() {
    return {
      
      showLoader: false,
      userDetails: localStorage.getItem("adminUserDetails")
        ? JSON.parse(localStorage.getItem("adminUserDetails"))
        : null,
      tableProps: {
          pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
          toolbar: ["ExcelExport", "PdfExport", "Search"],
          search: { operator: "contains", ignoreCase: true },
       },
       companies_image: function() {
          return {
              template: Templates
          };
        }
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
                    pageOrientation: 'Landscape',
                    fileName: "company-dashboard"
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

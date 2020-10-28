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
              <e-column width="80" field="index" headerText="#"></e-column>
              <e-column width="300" field="email" headerText="Email"></e-column>
              <e-column
                width="250"
                field="phoneNumber"
                headerText="Phone Number"
              ></e-column>
            </e-columns>
          </ejs-grid>
          <TableLoader :showLoader="showLoader" />
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="branch_card position-fixed">
          <div class="">
            <div class="row align-items-center mt-3">
              <div class="col-md-6 mt-2 text-left">
                <p>Branch Name:</p>
              </div>
              <div class="col-md-6">
                <div class="">
                  <p style="font-size: 20px; font-weight: bold"></p>
                </div>
              </div>
            </div>
            <div
              class="small__card_content_wrapper small_card small__card_content_wrapper"
            >
              <h4 class="dashboard__card__header">Wallet balance</h4>
              <div
                class="icon_wrapper yellow centralize icon_div_big text-center mt-3"
              >
                <img src="@/assets/img/money (3).svg" width="60px" />
              </div>
              <h4 class="dashboard__card__header font-weight-bold"></h4>
            </div>
            <div class="align-items-center mt-3">
              <p style="font-size: 13px">
                Phone Number:<span
                  class="font-weight-bold ml-2"
                  style="font-size: 13px"
                ></span>
              </p>
              <p style="font-size: 13px">
                Branch Email:<span
                  class="font-weight-bold text-left ml-2"
                  style="font-size: 13px"
                ></span>
              </p>
              <p style="font-size: 13px">
                Branch Address:<span
                  class="font-weight-bold ml-2"
                  style="font-size: 13px"
                ></span>
              </p>
            </div>
            <div class="mt-4 mx-auto text-center">
              <router-link
                :to="{
                  name: 'addDevice',
                  query: { companyBranchId: this.$route.query.companyBranchId },
                }"
                class="btn btn_theme"
                >Add Device</router-link
              >
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
      backgroundUrl,
      showLoader: false,
      userDetails: localStorage.getItem("adminUserDetails")
        ? JSON.parse(localStorage.getItem("adminUserDetails"))
        : null,
      tableProps: {
          pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
          toolbar: ["ExcelExport", "PdfExport", "Search"],
          search: { operator: "contains", ignoreCase: true },
       },
    };
  },
  computed: {
    userName() {
      return `${this.userDetails.firstName} ${this.userDetails.lastName}`;
    },
  },
  methods: {},
};
</script>

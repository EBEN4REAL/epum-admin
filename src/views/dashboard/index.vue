<template>
  <masterLayout>
    <div class="row">
      <div class="col-lg-9 col-md-6">
        <div class="new_row_section mb-3">
          <div class="small_card product_details_card mt-3">
            <div class="title font-weight-bold">
              <h4>Dashboard</h4>
              <hr />
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-2 border-right">
                <div class="text-center mt-3">
                  <img src="@/assets/img/company_icon.png" width="60px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">Companies</h6>

                  <div class="mb-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                    >
                      {{companyCount}}
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 border-right">
                <div class="text-center mt-3">
                  <img src="@/assets/img/dealer_icon.png" width="90px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">Dealers</h6>

                  <div class="mb-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                      >{{dealerCount}}
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2">
                <div class="text-center">
                  <img src="@/assets/img/branch_icon.png" width="70px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">Outlets</h6>

                  <div class="mb-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                      >{{branchCount}}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pad_div">
        <div class="text-left tabs__lists">
          <h6 class="ml-3">First Five Companies</h6>
          <ejs-grid
            v-show="!showLoader"
            ref="dataGrid"
            :created="refreshGrid"
            :allowSorting="true"
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
        <div class="branch_card dashboard_branch_card pl-3 position-fixed company-dashboard-board">
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
            <div class="map-device-company p-1 py-3">
              <div class="text-white">
                <p class="text-center">Manage Users here</p>
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
            <div class="offline-pump-card p-2 mb-2" v-for="(device, index) in offlineDevices" :key="index">
              <div class="d-flex">
                <div class="pumps-image">
                  <img src="@/assets/img/fuel.png" alt="" width="30" />
                </div>
                <div class="pump-location pl-3">
                  <p>{{device.deviceId}}</p>
                  <p class="pump-name">{{device.pumps}}</p>
                  <small>{{device.branchName}}</small>
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
import TableLoader from "@/components/tableLoader/index";
import {
  Sort,
  Search,
} from "@syncfusion/ej2-vue-grids";

export default {
  components: {
    masterLayout,
    TableLoader
  },
  provide: {
    grid: [Sort, Search],
  },
  data() {
    return {
      companyCount: 0,
      branchCount: 0,
      dealerCount: 0,
      offlineDevices: [],
      showLoader: false,
      userDetails: localStorage.getItem("adminUserDetails")
        ? JSON.parse(localStorage.getItem("adminUserDetails"))
        : null,
      companies_image: function() {
          return {
            template: Templates
          };
        }
    };
  },
  mounted() {
      this.getCompanyCount()
      this.getBranchCount()
      this.getDealerCount()
      this.getCompanies()
      this.getOfflineDevices()
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
    getCompanyCount() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company/Count`, configObject.authConfig())
            .then(res => {
                this.companyCount = res.data
            })
            .catch(error => {

            });
    },
    getBranchCount() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company/BranchCount`, configObject.authConfig())
            .then(res => {
                this.branchCount = res.data
            })
            .catch(error => {

            });
    },
    getDealerCount() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company/DealerCount`, configObject.authConfig())
            .then(res => {
                this.dealerCount = res.data
            })
            .catch(error => {

            });
    },
    getCompanies() {
      this.showLoader = true
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company?PageNumber=1&PageSize=5&Search=&Order=&SortName=`, configObject.authConfig())
            .then(res => {
                this.$refs.dataGrid.ej2Instances.setProperties({
                    dataSource: res.data.data
                });
                this.refreshGrid();
                this.showLoader = false;
        })
        .catch(error => {
            this.showLoader = false
        });
    },
    getOfflineDevices() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Admin/OfflinePump`, configObject.authConfig())
            .then(res => {
                res.data.sort((a, b) => {
                  if (a.branchName && b.branchName) {
                    return a.branchName.toLowerCase() > b.branchName.toLowerCase() ? 1 : b.branchName.toLowerCase() > a.branchName.toLowerCase() ? -1 : 0;
                  } else if (a.branchName && !b.branchName) {
                    return -1
                  } else { 
                    return 1
                  }
                    
                });
                let newArray = res.data.splice(0, 5)
                newArray.forEach(el => {
                    el.date = this.$moment(el.date).format("MM/DD/YYYY hh:mm A");
                    el.status = 'Offline'
                })
                this.offlineDevices = newArray
            })
            .catch(error => {
            });
    },
  },
};
</script>

<template>
  <masterLayout :branchName="comapanyBranchObj.name">
    <div class="row">
      <div class="col-lg-9 col-md-6">
        <div class="new_row_section">
          <div class="row mt-3">
            <div class="col-lg-6 col-md-3 remove_padding-right">
              <router-link
                :to="{ name: 'installedTanks', query: {companyBranchId: this.$route.query.companyBranchId} }"
                class="router_link__text"
              >
                <div
                  class="small__card_content_wrapper small_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">Installed Tanks</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big text-center"
                  >
                    <img src="@/assets/img/oil-tank.png" width="40px" />
                  </div>
                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold"
                    >
                      {{ installedTanksCount }}
                    </small>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="col-lg-6 col-md-3 remove_padding-right">
              <router-link
                :to="{ name: 'installedPumps', query: { companyBranchId: this.$route.query.companyBranchId} }"
                class="router_link__text"
              >
                <div
                  class="small__card_content_wrapper small_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">Installed Pumps</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big text-center"
                  >
                    <img src="@/assets/img/fuel.png" width="40px" />
                  </div>
                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold"
                      >
                      {{pumpCount}}</small
                    >
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="small_card product_details_card mt-3">
            <div class="title">
              <h4>Products Available in Stock</h4>
              <hr />
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-2 border-right">
                <div class="text-center mt-3">
                  <img src="@/assets/img/oil-truck (-2.png" width="40px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">PMS Available</h6>

                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                    >
                      {{convertThousand(comapanyBranchObj.pmsTotalVolume)}} Ltrs
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 border-right border-right-card">
                <div class="text-center mt-3">
                  <img src="@/assets/img/oil-truck (-1.png" width="40px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">AGO Available</h6>

                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                    >
                      {{convertThousand(comapanyBranchObj.agoTotalVolume)}} Ltrs
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 border-right-card">
                <div class="text-center">
                  <img src="@/assets/img/oil-truck (1).png" width="40px" />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">DPK Available</h6>

                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                    >
                     {{convertThousand(comapanyBranchObj.dpkTotalVolume)}} Ltrs
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="small_card product_details_card mt-3 mb-4">
            <div class="title">
              <h4>Installed tanks</h4>
              <hr />
            </div>
            <TableLoader :showLoader="showLoader"/>
             <div class="" v-show="!showLoader">
             <vueper-slides                            
              class="no-shadow"
              :visible-slides="4"
              slide-multiple
              :gap="0"
              :slide-ratio="1 / 4"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
              <vueper-slide  v-for="(tank, index) in tanks" :key="index" style="display: block !important;padding-right: 0; padding-left: 0">
                  <template v-slot:content>
                      <div class="low_tank text-center">
                        <h4 class="tank__name__header low_tank_name">{{ tank.name }}</h4>
                        <p style="margin-bottom: 0 !important" class="max-lines">
                          <!-- {{ tank.branchName[0].toUpperCase() }}{{tank.branchName.slice(1).toLowerCase()}} -->
                        </p>
                        <span>
                        {{tank.lastSeen}}
                        </span>
                        <div class="animated__tanks__div">
                          <div class="bowl" style="margin-left: 25%">
                            <div class="inner">
                              <div
                                class="fill"
                                v-bind:style="{
                                  '--h': tank.height + 'px',
                                  '--c': tank.color
                                }"
                              >
                              
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  width="300px"
                                  height="300px"
                                  viewBox="0 0 300 300"
                                  enable-background="new 0 0 300 300"
                                  xml:space="preserve"
                                >
                                  <path
                                    class="waveShape"
                                    d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
                                                          c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
                                                          c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                       
                      </div>
                    </div>
                     <div class="clearfix mt-3" style="width: 90%; margin: 0 auto;">
                            <div class="left_div">
                                <span class="left">Current Volume:</span>
                            </div>
                            <div class="right_div">
                                <span class="tank__header__text">
                                {{ convertThousand(tank.currentVolume) }}
                                </span>
                            </div>
                        </div>
                        <div class="clearfix pb-4 mt-2" style="width: 90%; margin: 0 auto;">
                            <div class="left_div">
                                <span class="left">Max Capacity:</span>
                            </div>
                            <div class="right_div">
                                <span class="tank__header__text">
                                {{ convertThousand(tank.maxCapacity) }}
                                </span>
                            </div>
                        </div>
                  </template>
              </vueper-slide>
          </vueper-slides>
          </div>
          <div class="text-center py-3" v-show="tanks.length === 0 && !showLoader">
             No Tanks Added Yet
          </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="branch_card position-fixed mobile_responsiveness">
          <div class="">
            <div class="row align-items-center mt-3">
              <div class="col-md-6 mt-2 text-left">
                <p>Branch Name:</p>
              </div>
              <div class="col-md-6">
                <div class="">
                  <p style="font-size: 20px; font-weight: bold;">{{ comapanyBranchObj.name }}</p>
                </div>
              </div>
            </div>
            <div class="small__card_content_wrapper small_card small__card_content_wrapper">
              <h4 class="dashboard__card__header">Wallet balance</h4>
              <div
                class="icon_wrapper yellow centralize icon_div_big text-center mt-3"
              >
                <img src="@/assets/img/money (3).svg" width="60px" />
              </div>
              <h4 class="dashboard__card__header font-weight-bold">{{ walletBalance }}</h4>
            </div>
            <div class="align-items-center mt-3">
              <p style="font-size: 13px">
                Phone Number:<span
                  class="font-weight-bold ml-2"
                  style="font-size: 13px"
                  >{{ comapanyBranchObj.phone }}</span
                >
              </p>
              <p style="font-size: 13px">
                Branch Email:<span
                  class="font-weight-bold text-left ml-2"
                  style="font-size: 13px"
                  >{{ comapanyBranchObj.email }}</span
                >
              </p>
              <p style="font-size: 13px">
                Branch Address:<span
                  class="font-weight-bold ml-2"
                  style="font-size: 13px"
                  >{{
                    `${comapanyBranchObj.street},${comapanyBranchObj.city},${comapanyBranchObj.state}`
                  }}</span
                >
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
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import TableLoader from "@/components/tableLoader/index";

export default {
  components: {
    masterLayout,
    VueperSlides, 
    VueperSlide,
    TableLoader
  },
  mounted() {
    this.getWalletBalance();
    this.getTanks()
    this.getPumpsCount()
    this.companyBranchId = this.$route.query.companyBranchId;
    let ml = sessionStorage.getItem(this.companyBranchId);
    if (!ml) {
      let allData = localStorage.getItem("branchesList");
     let dt = JSON.parse(allData);
      dt.forEach((my, index) => {
        if (my.id === this.companyBranchId) {
          ml = JSON.stringify(my);
          sessionStorage.setItem(this.companyBranchId, ml);
        }
      });
    }
    let companyBranchDetails = JSON.parse(ml);
    this.comapanyBranchObj = companyBranchDetails;
  },
  data() {
    return {
      comapanyBranchObj: {},
      walletBalance: 0,
      tanks: [],
      installedTanksCount: 0,
      pumpCount: 0,
      showLoader: false
    };
  },
  methods: {
    convertThousand(request) {
      if (!isFinite(request)) {
        return "0.00";
      }
      return request
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getWalletBalance() {
      this.axios
        .get(
          `${configObject.apiBaseUrl}/Branch/branchwallet/${this.$route.query.companyBranchId}`,
          configObject.authConfig()
        )
        .then((res) => {
          this.walletBalance = this.convertThousand(res.data.balance);
        })
        .catch((error) => {});
    },
    getPumpsCount() {
      this.axios
        .get(
        `${configObject.apiBaseUrl}/Dashboard/Branch/PumpCount/${this.$route.query.companyBranchId}`,
        configObject.authConfig()
        )
        .then(response => {
            this.pumpCount = response.data.pumpCount
        })
        .catch(error => {});
    },
    getTanks() {
          this.showLoader = true;
          this.axios
          .get(
          `${configObject.apiBaseUrl}/Branch/Tanks/${this.$route.query.companyBranchId}`,
          configObject.authConfig()
          )
          .then(response => {
            this.showLoader = false;
            this.installedTanksCount = response.data.length;
            response.data.sort((a, b) => {
                if (a.name === b.name) {
                    return a.name > b.name ? 1 : -1;
                }
                return a.name > b.name ? 1 : -1;
            });
            response.data.forEach(element => {
                            response.data.forEach(element => {
            element.height = parseInt(
              150 - (element.currentVolume / element.maxCapacity) * 140
            );
            if (element.height >= 98) {
              element.waveColor = "red";
            } else if (element.height >= 70) {
              element.waveColor = "#039be4";
            } else {
              element.waveColor = "green";
            }
            element.waterVolume =
              element.waterVolume == null ? 0 : element.waterVolume;
            if (
              element.productName !== undefined &&
              element.productName !== null
            ) {
              if (element.productName.toLowerCase() === "pms") {
                element.color = "#d8991c";
              } else if (element.productName.toLowerCase() === "ago") {
                element.color = "#0fce29";
              } else if (element.productName.toLowerCase() === "dpk") {
                element.color = "#00aced";
              } else if (element.productName.toLowerCase() === "lpg") {
                element.color = "purple";
              }
            } else if (element.name !== undefined && element.name !== null) {
              if (element.name.toLowerCase().includes("pms")) {
                element.color = "#d8991c";
              } else if (element.name.toLowerCase().includes("ago")) {
                element.color = "#0fce29";
              } else if (element.name.toLowerCase().includes("dpk")) {
                element.color = "#00aced";
              } else if (element.name.toLowerCase().includes("lpg")) {
                element.color = "purple";
              }
            }
          });
          response.data.sort(function(a, b) {
            return a.height - b.height;
          });
          this.tanks = response.data;
            })
          })
          .catch(error => {
            this.showLoader = false
          });
      },
  },
};
</script>

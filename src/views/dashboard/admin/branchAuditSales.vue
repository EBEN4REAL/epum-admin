<template>
  <masterLayout>
    <div class="row">
      <div class="col-lg-7 col-md-6">
        <div class="new_row_section">
          <div class="row mt-3">
            <div class="col-lg-12 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform by getting to know your Retail Outlet Pump Audit</p>
                        </div>
                        <div class="col-md-4">
                            
                        </div>
                    </div>
                </div>
             </div>
            </div>

          <div class="small_card product_details_card audit-sales mt-3">
              <div class="row p-4 align-items-center">
            <div class="col-md-5">
                <div class="start-date input__block">
                    <vue-ctk-date-time-picker
                        v-model="dateRange"
                        :max-date="maxDate"
                        :range="true"
                        :autoClose="true"
                        :custom-shortcuts="customShortcuts"
                        color="#290C53"
                        format="YYYY-MM-DDTHH:mm:ss"
                        formatted="DD/MM/YYYY"
                        label="Select a date range"
                    />
                </div>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-4">
                <div class="text-center">
                    <button class="btn btn-success text-white" @click="download"
                      :disabled="isButtonDisabled ? true : null"
                      :style="[
                        isButtonDisabled
                          ? { cursor: 'not-allowed' }
                          : { cursor: 'pointer' }
                      ]"
                    ><i class="fa fa-plus mr-2"></i>Download
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

      <div class="col-lg-5 col-md-6">
        <div class="branch_card audit-sales-card" style="width: 100%; display: flex; flex-direction: column; justify-content: space-around;">
            <div class="row align-items-center mt-3">
              <div class="col-md-6 mt-2 text-left">
                <p>Outlet Name</p>
              </div>
              <div class="col-md-6">
                <div class="">
                  <p style="font-size: 16px; font-weight: bold;">{{comapanyBranchObj.name}}</p>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-md-6 mt-2 text-left">
                <p>Company Name</p>
              </div>
              <div class="col-md-6">
                <div class="">
                  <p style="font-size: 16px; font-weight: bold;">{{comapanyBranchObj.companyName}}</p>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-md-6 mt-2 text-left">
                <p>City</p>
              </div>
              <div class="col-md-6">
                <div class="">
                  <p style="font-size: 16px; font-weight: bold;">{{comapanyBranchObj.city}}</p>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-md-6 mt-2 text-left">
                <p>Country</p>
              </div>
              <div class="col-md-6">
                <div class="">
                  <p style="font-size: 16px; font-weight: bold;">{{comapanyBranchObj.country}}</p>
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
import configObject from "@/config";
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
  },
 
  data() {
    return {
      userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
      comapanyBranchObj: {},
      maxDate: this.$moment(new Date()).format("YYYY-MM-DD"),
      customShortcuts: [
        { key: "Today", label: "Today", value: "day" },
        { key: "yesterday", label: "Yesterday", value: "-day" },
        { key: "last7Days", label: "Last 7 Days", value: 7 },
        { key: "lastWeek", label: "Last Week", value: "-isoWeek" },
        { key: "last30Days", label: "Last 30 Days", value: 30 },
        { key: "lastMonth", label: "Last Month", value: "-month" }
      ],
      dateRange: {},
      isButtonDisabled: false
    };
  },
  mounted() {
    const companyBranchId = this.$route.query.companyBranchId;
    let ml = sessionStorage.getItem(companyBranchId);
    if (!ml) {
      let allData = localStorage.getItem("branchesList");
     let dt = JSON.parse(allData);
      dt.forEach((my, index) => {
        if (my.id === companyBranchId) {
          ml = JSON.stringify(my);
          sessionStorage.setItem(companyBranchId, ml);
        }
      });
    }
    let companyBranchDetails = JSON.parse(ml);
    this.comapanyBranchObj = companyBranchDetails;
  },
  computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
  methods: {
    download() {
      if(!this.dateRange.start || !this.dateRange.end) {
          this.$toast("Please select a date range", {
              type: "error", 
              timeout: 3000
          });
          return;
      }


      $('.loader').show();
      this.isButtonDisabled = true;

       this.axios.get(`${configObject.apiBaseUrl}/Audit/BranchPumpAudit?branchId=${this.$route.query.companyBranchId}&startDate=${this.dateRange.start}&endDate=${this.dateRange.end}`, configObject.authConfig)
          .then(res => {
            console.log(res.data)
                this.$toast("Download Successful", {
                    type: "success",
                    timeout: 3000
                });
                this.isButtonDisabled = false;
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
    }
  },
};
</script>

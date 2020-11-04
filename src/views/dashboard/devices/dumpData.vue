<template>
<div>
    <TimestampModal :timestamp="timestampDetails" />
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
                            <p>Get started with epump company admin platform by getting to manage your dumped data</p>
                        </div>
                        <div class="col-md-4">
                            
                        </div>
                    </div>
                </div>
             </div>
            </div>

          <div class="small_card product_details_card audit-sales mt-3">
              <div class="row p-4 align-items-center">
            <div class="col-md-4">
            <div class="input__block input_margin">
                <input type="number" placeholder="Device ID" class="" v-model="deviceId1" />
            </div>
            </div>
            <div class="col-md-4">
                <div class="input_margin start-date input__block">
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
            <div class="col-md-4">
                <div class="text-center">
                    <button class="btn btn-success text-white" @click="search"
                      :disabled="isButtonDisabled ? true : null"
                      :style="[
                        isButtonDisabled
                          ? { cursor: 'not-allowed' }
                          : { cursor: 'pointer' }
                      ]"
                    ><i class="fa fa-search mr-2"></i>Search
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
        <div class="small_card product_details_card audit-sales dumped_data mt-3">
              <div class="row p-4 align-items-center">
            <div class="col-md-4">
            <div class="input__block input_margin">
                <input type="number" placeholder="Device ID" class="" v-model="deviceId2" />
            </div>
            </div>
            <div class="col-md-4">
            <div class="input__block input_margin">
                <input type="number" placeholder="Device Timestamp" v-model="timeStamp" class="input_holder" />
            </div>
            </div>
            <div class="col-md-4">
                <div class="text-center">
                    <button class="btn btn-success text-white" @click="convert"
                      :disabled="isButtonDisabled2 ? true : null"
                      :style="[
                        isButtonDisabled2
                          ? { cursor: 'not-allowed' }
                          : { cursor: 'pointer' }
                      ]"
                    ><i class="fa fa-angle-double-right mr-2"></i>Convert
                      <img
                        src="@/assets/img/git_loader.gif"
                        style="display:none"
                        width="15px"
                        class="ml-3 loader2"
                      />
                    </button>
                </div>
            </div>
            </div>
          </div>
      </div>
    </div>
    <div class="new_row_section mt-3">
          <ejs-grid
            v-show="!showLoader"
            ref="dataGrid"
            :created="refreshGrid"
            :allowPaging="true"
            :allowSorting="true"
            :pageSettings="tableProps.pageSettings"
            :allowTextWrap='true'
            >
            <e-columns>
                <e-column width="80" field="index" headerText="#"></e-column>
                <e-column width="100" field="date" headerText="Date"></e-column>
                <e-column width="400" field="dData" headerText="DData"></e-column>
            </e-columns>
        </ejs-grid>
        <TableLoader :showLoader="showLoader"/>
    </div>
  </masterLayout>
</div>

</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort} from "@syncfusion/ej2-vue-grids";
import TimestampModal from '@/components/modals/timestamp.vue';
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
    TableLoader,
    TimestampModal
  },
  provide: {
      grid: [Page, Sort]
  },
  data() {
    return {
      userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
      maxDate: this.$moment(new Date()).format("YYYY-MM-DD"),
      tableProps: {
          pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
      },
      customShortcuts: [
        { key: "Today", label: "Today", value: "day" },
        { key: "yesterday", label: "Yesterday", value: "-day" },
        { key: "last7Days", label: "Last 7 Days", value: 7 },
        { key: "lastWeek", label: "Last Week", value: "-isoWeek" },
        { key: "last30Days", label: "Last 30 Days", value: 30 },
        { key: "lastMonth", label: "Last Month", value: "-month" }
      ],
      dateRange: {},
      isButtonDisabled: false,
      isButtonDisabled2: false,
      showLoader: false,
      timeStamp: null,
      deviceId1: null,
      deviceId2: null,
      timestampDetails: ''
    };
  },
  mounted() {
    this.deviceId1 = this.$route.query.id
    this.deviceId2 = this.$route.query.id
  },
  computed: {
    userName() {
        return `${this.userDetails.firstName} ${this.userDetails.lastName}`
    }
  },
  methods: {
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    search() {
      if(!this.deviceId1) {
          this.$toast("Please input a device ID", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(!this.dateRange.start || !this.dateRange.end) {
          this.$toast("Please select a date range", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      $('.loader').show();
      this.isButtonDisabled = true;

       this.axios.get(`${configObject.apiBaseUrl}/Devices/DumpData?id=${this.deviceId1}&startDate=${this.dateRange.start}&endDate=${this.dateRange.end}`, configObject.authConfig)
          .then(res => {
                let index = 0;
                res.data.forEach(el => {
                    el.date = this.$moment(el.date).format("MM/DD/YYYY hh:mm A");
                    el.index = ++index;
                })
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$refs.dataGrid.ej2Instances.setProperties({
                  dataSource: res.data
                });
                this.refreshGrid();
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
    convert() {
      if(!this.deviceId2) {
          this.$toast("Please input a device ID", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(!this.timeStamp) {
          this.$toast("Please input a timestamp", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      $('.loader2').show();
      this.isButtonDisabled2 = true;

       this.axios.get(`${configObject.apiBaseUrl}/Devices/ConvertTimeStamp/${this.deviceId2}/${this.timeStamp}`, configObject.authConfig)
          .then(res => {
            console.log(res.data)
            this.isButtonDisabled2 = false;
            $('.loader2').hide();
            this.timestampDetails = res.data.date
            this.$modal.show('timestampModal')
            // alert(`The timestamp is: ${res.data.date}`)
          })
          .catch(error => {
              this.isButtonDisabled2 = false;
              $('.loader2').hide();
              this.$toast(error.response.data.message, {
                  type: "error",
                  timeout: 3000
              });
          });
    },
  },
};
</script>

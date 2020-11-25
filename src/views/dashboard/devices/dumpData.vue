<template>
<div>
    <TimestampModal :timestamp="timestampDetails" />
    <masterLayout>
    <div class="row">
      <div class="col-lg-7 col-md-6">
        <div class="new_row_section">
          <div class="row">
            <div class="col-lg-12 remove-padding-left padding_div pr-0">
              <div class="small_card product_details_card audit-sales dumpdata_card">
              <div class="row p-4 align-items-center">
            <div class="col-md-4">
            <div class="input__block input_margin">
                <input type="text" placeholder="Device ID" class="" v-model="deviceId1" />
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
 </div>
</div>
      <div class="col-lg-5 col-md-6" style="position: relative">
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
    <div class="toggler-button ml-3">
          <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="">
                 Show all P1
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="">
                 Show all P2
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="">
                 Show ep 9
                </div>
             <button class="mt-4 btn btn-success text-white ml-3" @click="toggleAll"> 
               Toggle All Data
          </button>
           </div>
    <div class="new_row_section mt-3">
          <ejs-grid
            v-show="!showLoader"
            ref="dataGrid"
            :created="refreshGrid"
            :allowPaging="false"
            :allowSorting="true"
            :pageSettings="tableProps.pageSettings"
            :allowTextWrap='true'
            :rowDataBound='rowDataBound'
            >
            <e-columns>
                <e-column width="100" field="date" headerText="Date" text-align="left"></e-column>
                <e-column width="400" field="string" headerText="DData" text-align="left"></e-column>
                <e-column width="400" field="dData" headerText="DData" :visible="false" text-align="left"></e-column>
                <e-column width="80" headerText="Toggle Dump Data"  :template="toggleDumpData"></e-column>

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
import ToggleDumpDataTemp from '@/components/Templates/toggleDDataTemp.vue';

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
      pluginStartDate: this.$moment().format("YYYY-MM-DDTHH:mm:ss"),
      pluginEndData: this.$moment().format("YYYY-MM-DDTHH:mm:ss"),
      dateRange: { "start": this.pluginStartDate, "end":this.pluginEndData },
      isButtonDisabled: false,
      isButtonDisabled2: false,
      showLoader: false,
      timeStamp: null,
      deviceId1: null,
      deviceId2: null,
      timestampDetails: '',
      toggleDumpData: function() {
          return {
              template: ToggleDumpDataTemp
          };
      }
    };
  },
  created() {
    if (this.$route.query.startDate && this.$route.query.endData) {
      this.dateRange.start = this.$route.query.startDate
      this.dateRange.end = this.$route.query.endData
    } else {
      this.dateRange.start = `${this.pluginStartDate.substring(0, this.pluginStartDate.length - 8)}00:00:00`
      this.dateRange.end = this.pluginEndData;
      this.$router.push({ name: this.$route.name, query: { ...this.$route.query, startDate: this.dateRange.start, endData: this.dateRange.end } })
    }
    
    this.deviceId1 = this.$route.query.id
    this.deviceId2 = this.$route.query.id
    this.search()
  },
  mounted() {
      // this.search()
  },
  watch: {
    dateRange: function (newRange, oldRange) {
      if ( newRange.start!== null && newRange.end !== null) {
        this.$router.push({ name: this.$route.name, query: { ...this.$route.query, startDate: newRange.start, endData: newRange.end } })
      }
    },
    '$route' (to, from){
      if ((from.query.startDate && ((from.query.startDate !== to.query.startDate) || (from.query.endData !== to.query.endData))) && ((this.dateRange.start !== to.query.startDate) || (this.dateRange.end !== to.query.endData))) {
        this.dateRange.start = to.query.startDate
        this.dateRange.end = to.query.endData
        
        this.search()
      }
    }
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
    toggleAll() {
      this.$refs.dataGrid.getColumns()[2].visible = !this.$refs.dataGrid.getColumns()[2].visible
      this.$refs.dataGrid.getColumns()[1].visible = !this.$refs.dataGrid.getColumns()[1].visible
      this.refreshGrid();
    },
    rowDataBound(arging){
      arging.row.addEventListener("click", args => {
        if (!(args.target.classList.contains('fa-eye') || args.target.classList.contains('fa-eye-slash') || args.target.classList.contains('eye_holder'))) {
          return
        }
        if(arging.row.children[1].innerHTML == arging.data.dData) {
          arging.row.children[1].innerHTML = arging.data.string
          arging.row.children[2].innerHTML = arging.data.dData
          arging.row.children[3].innerHTML = '<div><button class="text-center var_btn eye_holder"><!----><i class="fa fa-eye"></i></button></div>'
        }else {
          arging.row.children[1].innerHTML = arging.data.dData
          arging.row.children[2].innerHTML = arging.data.string
          arging.row.children[3].innerHTML = '<div><button class="text-center var_btn eye_holder"><!----><i class="fa fa-eye-slash "></i></button></div>'
        }
      });
  },
    search() {
      //  let data = [
      //  {
      //   index: 1,
      //   dData:  '{"ep":1,"di":"862273049189251","tk":1956521865,"pumps":[{"st":255,"tz":197257.641,"ft":197124.656,"nm":"P4"},{"st":255,"tz":0.000,"ft":0.000,"nm":"P40"}],"tm":48708176,"fv":20412,"sl":"i"}',
      //   date: '11/19/2020 07:41 PM',
      //   string: "",
      //  },
      //  {
      //   index: 1,
      //   dData:  '{"ep":1,"di":"862273049189251","tk":1956521865,"pumps":[{"st":255,"tz":197257.641,"ft":197124.656,"nm":"P4"},{"st":255,"tz":0.000,"ft":0.000,"nm":"P40"}],"tm":48708176,"fv":20412,"sl":"i"}',
      //   date: '11/19/2020 07:41 PM',
      //   string: "",
      //  },
      // ]
      // data.forEach(el => {
      //   let pumpsArr = parseDData.pumps.map(el => {
      //     return el.nm
      //   })
      //   let pumps = pumpsArr.join(', ')
      //   const pumpLabel = pumpsArr.length < 1 ? 'Pump' : 'Pumps'
      //   const info = `${pumpLabel} ${pumps} ${pumpsArr < 1 ? 'is' : 'are'}`
      //   if(parseDData.ep == 0) {
      //     el.string = `${info} booting`
      //   }else if(parseDData.ep == 1) {
      //     el.string = `${info} connected`
      //   }else if(parseDData.ep == 2) {
      //     el.string = `${info} just processed a transaction`
      //   }else if(parseDData.ep == 9) {
      //     el.string = `Status check on ${pumpLabel} ${pumps}`
      //   }
      // })
      // this.$refs.dataGrid.ej2Instances.setProperties({
      //   dataSource: data
      // });
      // this.refreshGrid();

      // return;

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
      this.showLoader = true

       this.axios.get(`${configObject.apiBaseUrl}/Devices/DumpData?id=${this.deviceId1}&startDate=${this.dateRange.start}&endData=${this.dateRange.end}`, configObject.authConfig)
          .then(res => {
            res.data.forEach(el => {
              el.date = this.$moment(el.date).format("MM/DD/YYYY hh:mm A");
              el.dData = el.dData.includes("}{") ? el.dData.split("}{")[0] + "}" : el.dData
              
              el.dData = el.dData.replace(/'/g, '"')
              const parseDData = JSON.parse(el.dData)
              let info
              let pumpLabel
              let pumps
              if(parseDData.pumps) {
                let pumpInfo = parseDData.pumps.map(el => {
                  console.log(parseDData.ep)
                  if(parseDData.ep == 1) {
                    if(el.st && el.st == 255) {
                      return `${el.nm} is online but disconnected `
                    }else {
                      return `${el.nm} is online`
                    }
                  }
                  if(parseDData.ep == 0) {
                    return `${el.nm} is booting`
                  }
                  if(parseDData.ep == 0) {
                    return `${el.nm} just processed a transaction`
                  }
                  if(parseDData.ep == 4) {
                    return `${el.nm} just got restarted`
                  }
                }).join(', ')
                let pumpsArr = parseDData.pumps.map(el => {
                  return el.nm
                })
                el.string = pumpInfo
                pumps = pumpsArr.join(', ')
                pumpLabel = pumpsArr.length < 1 ? 'Pump' : 'Pumps'
                info = `${pumpLabel} ${pumps} ${pumpsArr < 1 ? 'is' : 'are'}`
                
              } else if(parseDData.pm) {
                pumpLabel = 'Pump'
                pumps = parseDData.pm
                info = `Pump ${parseDData.pm} is`
              }
              
              // if(parseDData.ep == 0) {
              //   el.string = `${info} booting`
              // } else if(parseDData.ep == 1) {
              //   el.string = `${info} connected`
              //  }else if(parseDData.ep == 2) {
              //   el.string = `${pumpLabel} ${pumps} just processed a transaction`
              //  }else if(parseDData.ep == 4) {
              //   el.string = `${pumpLabel} ${pumps} just restarted`
              //  }else if(parseDData.ep == 9) {
              //   el.string = `Status check on ${pumpLabel} ${pumps}`
              // }
              if(parseDData) {
                console.log(parseDData)
              }
            })
            
            this.dumpData = res.data
            this.isButtonDisabled = false;
            $('.loader').hide();
            this.$refs.dataGrid.ej2Instances.setProperties({
              dataSource: res.data
            });
            this.showLoader = false
            this.refreshGrid();
          })
          .catch(error => {
            this.showLoader = false
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
            this.isButtonDisabled2 = false;
            $('.loader2').hide();
            this.timestampDetails = res.data.date
            this.$modal.show('timestampModal')
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





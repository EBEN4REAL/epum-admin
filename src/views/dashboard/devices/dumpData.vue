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
            <div class="justify-content-between d-flex mt-4">
               <div class="">
                  <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="" v-model="ep1Show" @click="changeView('ep1')">
                  Show all ep1
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="" v-model="ep2Show" @click="changeView('ep2')">
                  Show all ep2
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="" v-model="ep9Show" @click="changeView('ep9')">
                  Show ep 9
                  <!-- {{ep9Show}} -->
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="" v-model="showAll" @click="changeView('')">
                  Show All
                </div>
               </div>
                <div class="mr-4">
                  <button class="mt-4 btn btn-success text-white ml-3" @click="toggleAll"> 
                      Toggle All Data
                </button>
              </div>
          </div>
    
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
      dumpData: [],
      view: '',
      ep1Show: false,
      ep2Show: false,
      ep9Show: false,
      showAll: false,
      ep1ParsedArray: [],
      ep2ParsedArray: [],
      ep9ParsedArray: [],
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
    changeView(view) {
      if (view == '') {
        if (this.showAll == true) {
          return
        }
        this.ep1Show = false
        this.ep2Show = false
        this.ep9Show = false
        // const dumpDataInfo = JSON.parse(localStorage.getItem('dumpDataInfo'))
        this.$refs.dataGrid.ej2Instances.setProperties({
          dataSource: this.dumpDataInfo
          // dataSource: dumpDataInfo
        });
        this.refreshGrid();
      }
      if (view == 'ep1') {
        if (this.ep1Show == true) {
          // const dumpDataInfo = JSON.parse(localStorage.getItem('dumpDataInfo'))
          this.$refs.dataGrid.ej2Instances.setProperties({
            dataSource: this.dumpDataInfo
            // dataSource: dumpDataInfo
          });
          this.refreshGrid();
          return
        }
        this.ep2Show = false
        this.ep9Show = false
        this.showAll = false
        // const ep1ParsedArray = JSON.parse(localStorage.getItem('ep1ParsedArray'))
        this.$refs.dataGrid.ej2Instances.setProperties({
          dataSource: this.ep1ParsedArray
          // dataSource: ep1ParsedArray
        });
        this.refreshGrid();
      }
      if (view == 'ep2') {
        if (this.ep2Show == true) {
          // const dumpDataInfo = JSON.parse(localStorage.getItem('dumpDataInfo'))
          this.$refs.dataGrid.ej2Instances.setProperties({
            dataSource: this.dumpDataInfo
            // dataSource: dumpDataInfo
          });
          this.refreshGrid();
          return
        }
        this.ep1Show = false
        this.ep9Show = false
        this.showAll = false
        // const ep2ParsedArray = JSON.parse(localStorage.getItem('ep2ParsedArray'))
        this.$refs.dataGrid.ej2Instances.setProperties({
          dataSource: this.ep2ParsedArray
          // dataSource: ep2ParsedArray
        });
        this.refreshGrid();
      }
      if (view == 'ep9') {
        if (this.ep9Show == true) {
          // const dumpDataInfo = JSON.parse(localStorage.getItem('dumpDataInfo'))
          this.$refs.dataGrid.ej2Instances.setProperties({
            dataSource: this.dumpDataInfo
            // dataSource: dumpDataInfo
          });
          this.refreshGrid();
          return
        }
        this.ep1Show = false
        this.ep2Show = false
        this.showAll = false
        // const ep9ParsedArray = JSON.parse(localStorage.getItem('ep9ParsedArray'))
        this.$refs.dataGrid.ej2Instances.setProperties({
          dataSource: this.ep9ParsedArray
          // dataSource: ep9ParsedArray
        });
        this.refreshGrid();
      }
    },
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    toggleAll() {
      this.$refs.dataGrid.getColumns()[2].visible = !this.$refs.dataGrid.getColumns()[2].visible
      this.$refs.dataGrid.getColumns()[1].visible = !this.$refs.dataGrid.getColumns()[1].visible
      this.refreshGrid();
    },
    rowDataBound(arging){
        if(arging.row.children[1].innerHTML == 'Configuration Check') {
          arging.row.style.backgroundColor = "green";
        }
        if(arging.row.children[1].innerHTML.includes('disconnected')) {
          const text = arging.row.children[1].innerHTML.replace("disconnected", `<span style="color: red; display: inline">disconnected</span>`);
          arging.row.children[1].innerHTML = text;
        }
        if(arging.row.children[1].innerHTML.toLowerCase().includes('is online')) {
          arging.row.style.backgroundColor = "#ADD8E6";
        }
        if(arging.row.children[1].innerHTML.toLowerCase().includes('filling complete nozzle down')) {
          arging.row.style.backgroundColor = "#808080";
        }
        if(arging.row.children[1].innerHTML.toLowerCase().includes('Online and Nozzle down')) {
          arging.row.style.backgroundColor = "orange";
        }
        if(arging.row.children[1].innerHTML.includes('is booting')) {
          arging.row.style.backgroundColor = "gold";
        }
        if(arging.row.children[1].innerHTML.includes('total transaction')) {
          arging.row.style.backgroundColor = "#6AA121";
        }
        if(arging.row.children[1].innerHTML == 'Device checking for update') {
          arging.row.style.backgroundColor = "#FF7E00";
        }
        if(arging.row.children[1].innerHTML == 'Device checking for download') {
          arging.row.style.backgroundColor = "Alloy orange";
        }
      arging.row.addEventListener("click", args => {
        if (!(args.target.classList.contains('fa-plus') || args.target.classList.contains('fa-minus') || args.target.classList.contains('eye_holder'))) {
          return
        }
       
        if(arging.row.children[1].innerHTML == arging.data.dData) {
          arging.row.children[1].innerHTML = arging.data.string
          arging.row.children[2].innerHTML = arging.data.dData
          arging.row.children[3].innerHTML = '<div><button class="text-center var_btn eye_holder"><!----><i class="fa fa-plus"></i></button></div>'
        }else {
          arging.row.children[1].innerHTML = arging.data.dData
          arging.row.children[2].innerHTML = arging.data.string
          arging.row.children[3].innerHTML = '<div><button class="text-center var_btn eye_holder"><!----><i class="fa fa-minus"></i></button></div>'
        }
      });
  },
    search() {
      // setTimeout(() => {
      //   if (localStorage.getItem('dumpDataInfo')) {
      //     const dumpData = JSON.parse(localStorage.getItem('dumpDataInfo'))
      //     this.$refs.dataGrid.ej2Instances.setProperties({
      //       dataSource: dumpData
      //     });
      //     this.showLoader = false
      //     this.refreshGrid();
      //     this.dumpData = dumpData
      //     // return
      //   }
      // }, 1000);
    

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

       this.axios.get(`${configObject.apiBaseUrl}/Devices/DumpData?id=${this.deviceId1}&startDate=${this.dateRange.start}&endData=${this.dateRange.end}`, configObject.authConfig())
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
                  if(parseDData.ep == 1) {
                    if(el.st && el.st == 255) {
                      return `Pump ${el.nm} is Online but disconnected `
                    }
                    if(el.st && el.st == 0) {
                      return `Pump ${el.nm} is Online but not active `
                    }
                    if(el.st && el.st == 2) {
                      return `Pump ${el.nm} is Online and Nozzle down `
                    }
                    if(el.st && el.st == 3) {
                      return `Pump ${el.nm} is Online and Nozzle up `
                    }
                    if(el.st && el.st == 5) {
                      return `Pump ${el.nm} is Online (Nozzle up and Authorized) `
                    } 
                    if(el.st && el.st == 6) {
                      return `Pump ${el.nm} is Online but filling `
                    }
                    if(el.st && el.st == 8) {
                      return `Pump ${el.nm} is Online (filling complete nozzle down) `
                    }else {
                      return `${el.nm} is Online`
                    }
                  }
                  if(parseDData.ep == 0) {
                    return `Pump ${el.nm} is booting`
                  }
                  if(parseDData.ep == 2) {
                    return `${parseDData.nm} dispensed ${parseDData.tv} at ${parseDData.pl}, total transaction is ${parseDData.ta}`
                  }
                  if(parseDData.ep == 4) {
                    return `Pump ${el.nm} just got restarted`
                  }
                  if(parseDData.ep == 5) {
                    el.string = `Pump ${parseDData.pn} is Online (Nozzle up and Authorized)`
                  }
                }).join(', ')
                let pumpsArr = parseDData.pumps.map(el => {
                  return el.nm
                })
                if (parseDData.pumps.length < 1) {
                  pumpInfo = 'There are no pumps recorded'
                } 
                el.string = pumpInfo
              } 
              if(parseDData.pm) {
                if(parseDData.ep == 0) {
                 el.string = `${parseDData.pm} is Online`
                }
                if (parseDData.ep == 0 && el.st == 255) {
                  el.string =  `${parseDData.pm} is booting and disconnected`
                }
                if(parseDData.ep == 1) {
                  el.string =  `${parseDData.pm} is booting`
                }
                if(parseDData.ep == 2) {
                  el.string =  `Pump ${parseDData.pm} dispensed ${parseDData.tv} at ${parseDData.pl}, total transaction is ${parseDData.ta}`
                  // return `${parseDData.pm} just processed a transaction`
                }
                if(parseDData.ep == 4) {
                  el.string =  `${parseDData.pm} just got restarted`
                }
                if(parseDData.ep == 3) {
                  el.string =  `Pump ${parseDData.pm} is filling`
                }
              }
              if (parseDData.FT) {
                  let pumpInfo = parseDData.FT.map(el => {
                     if(parseDData.ep == 5) {
                         return `Pump ${el.pn} is Online (Nozzle up and Authorized)`
                      } 
                  }).join(', ')
                  el.string = pumpInfo
              }
              if(parseDData.ep == 9) {
                el.string =  'Configuration Check'
              }
              if(parseDData.type == "checkUpdate") {
                el.string = 'Device checking for update'
              }
              if(parseDData.type == "downloadUpdate") {
                el.string = `${parseDData.id} Device checking for download`
              }  el.string = `Pump ${parseDData.pn} is Online (Nozzle up and Authorized)`
              
              
              if (parseDData.ep) {
                if (parseDData.ep == 1) {
                  this.ep1ParsedArray.push(el)
                }
                if (parseDData.ep == 2) {
                  this.ep2ParsedArray.push(el)
                }
                if (parseDData.ep == 9) {
                  this.ep9ParsedArray.push(el)
                }
              } 
              
            })

            // localStorage.setItem('ep1ParsedArray', JSON.stringify(this.ep1ParsedArray))
            // localStorage.setItem('ep2ParsedArray', JSON.stringify(this.ep2ParsedArray))
            // localStorage.setItem('ep9ParsedArray', JSON.stringify(this.ep9ParsedArray))
            
            this.dumpData = res.data
            this.dumpDataInfo = res.data
            localStorage.setItem('dumpDataInfo', JSON.stringify(res.data))
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
            // this.$toast(error.response.data.message, {
            //     type: "error",
            //     timeout: 3000
            // });
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

       this.axios.get(`${configObject.apiBaseUrl}/Devices/ConvertTimeStamp/${this.deviceId2}/${this.timeStamp}`, configObject.authConfig())
          .then(res => {
            this.isButtonDisabled2 = false;
            $('.loader2').hide();
            this.timestampDetails = res.data.date
            this.$modal.show('timestampModal')
          })
          .catch(error => {
              this.isButtonDisabled2 = false;
              $('.loader2').hide();
              // this.$toast(error.response.data.message, {
              //     type: "error",
              //     timeout: 3000
              // });
          });
    },
  },
};
</script>





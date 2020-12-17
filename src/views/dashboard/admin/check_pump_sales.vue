<template>
  <div>
      <EditCheckPumpSales :pumpSale="pumpSale" />
      <AddPumpStatus :pumpId="pumpId" />
      <masterLayout>
        <div class="new_row_section mt-3">
        <div class="buttons_section">
            <div>
                 <vue-ctk-date-time-picker
                        v-model="dateRange"
                        :max-date="maxDate"
                        :range="true"
                        :autoClose="true"
                        :custom-shortcuts="customShortcuts"
                        color="#290C53"
                        format="DDMMYYYY"
                        formatted="DD/MM/YYYY"
                        label="Select a date range"
                    />
            </div>
        <div class="">
            <button class="btn details_btn px-5 ml-4" @click="checkPumpSales">Check Sales</button>
        </div>
       </div>
        </div>
        <div class="new_row_section pb-4 mt-3">
            <div class="row">
                <div class="col-md-6">
                    <div class="pumps_diagnostics">
                        <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="row align-items-center mt-3">
                            <div class="col-md-12">
                                <label>Lower bound</label>
                                <div class="input__block">
                                    <input type="number" placeholder="Lower" class="" name="Name" v-model="lower" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row align-items-center mt-3">
                            <div class="col-md-12">
                                <label>Higher bound</label>
                                <div class="input__block">
                                    <input type="number" placeholder="Higher" class="" name="Name" v-model="higher" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row align-items-center mt-3">
                            <div class="col-md-12">
                                <label>Branch Name</label>
                                <div class="input__block">
                                    <input type="text" placeholder="Branch Name" class="" name="City" v-model="branchName"  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row align-items-center mt-3">
                            <div class="col-md-12">
                                <label>Device ID</label>
                                <div class="input__block">
                                    <input type="text" placeholder="Device ID" class="" v-model="deviceId"  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            </div>

                <div class="col-md-6">
                    <div class="pumps_diagnostics">
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <div class="row align-items-center mt-3">
                                    <div class="col-md-12">
                                        <label>Company </label>
                                        <div class="input__block">
                                            <select v-model="companyId" class="form-control" >
                                                <option disabled value="select company">Select company</option>
                                                <option :value="cp.id" v-for="(cp,i) in companies" :key='i'>{{cp.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div class="col-md-6">
                                <div class="row align-items-center mt-3">
                                    <div class="col-md-12">
                                        <label>Dealer</label>
                                        <div class="input__block">
                                            <select v-model="dealer" class="form-control" >
                                                <option disabled selected value="select dealer">select dealer</option>
                                                <option :value="dl.id" v-for="(dl,i) in dealers" :key='i'>{{dl.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row align-items-center mt-3">
                                    <div class="col-md-12">
                                        <label>Branch</label>
                                        <div class="input__block">
                                            <select class="form-control" name="dealerId" v-model="branchId">
                                                <option disabled selected value="select branch">select branch</option>
                                                <option :value="br.id" v-for="(br,i) in branches" :key='i'>{{br.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row align-items-center mt-3">
                                    <div class="col-md-12">
                                        <label>Pump</label>
                                        <div class="input__block">
                                            <select v-model="pump" class="form-control" >
                                                <option disabled selected value="select pump">select pump</option>
                                                <option :value="pmp.id" v-for="(pmp,i) in pumps" :key='i'>{{pmp.displayName}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <section class="new_row_section mt-3">
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
            :allowTextWrap='true'
            >
            <e-columns>
                <e-column width="200" field="dateOpened" headerText="Date Opened"></e-column>
                <e-column width="150" field="branchName" headerText="Branch Name"></e-column>
                <e-column width="150" field="volumeSold" headerText="Volume Sold(Ltrs)"></e-column>
                <e-column width="150" field="openingReadingFormatted" headerText="Opening Reading"></e-column>
                <e-column width="150" field="lastReadingFormatted" headerText="Last Reading"></e-column>
                <e-column width="150" field="deviceId" headerText="DeviceID"></e-column>
                <e-column width="150" field="price" headerText="Price"></e-column>
                <e-column width="150" field="pumpName" headerText="Pump Name"></e-column>
                <e-column width="150" field="totalMultiplier" headerText="Total Multiplier"></e-column>
                <e-column width="150" field="recordOpen" headerText="Record Open"></e-column>
                <e-column width="150" field="sync" headerText="Sync"></e-column>
                <e-column width="450"  headerText="Action" :template="CheckPumpSales"></e-column>

                
                
            </e-columns>
        </ejs-grid>
        <TableLoader :showLoader="showLoader"  /> 
        </section>
    </masterLayout>
  </div>
</template>
<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import Temp from "@/components/list_of_roles_template.vue";
import CheckPumpSalesTemplate from "@/components/Templates/check_pump_sales_template.vue";
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import EditCheckPumpSales from '@/components/modals/checkPumpSales/editCheckPumpSales';
import AddPumpStatus from '@/components/modals/checkPumpSales/addPumpStatus';


import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
    TableLoader,
    EditCheckPumpSales,
    AddPumpStatus
  },
   data() {
    return {
        showLoader: false,
        lower: "0",
        higher: "10000",
        branchName: "",
        companyId: 'select company',
        branchId: 'select branch',
        dealer: 'select dealer',
        deviceId: "",
        companies: [],
        branches: [],
        dealers: [],
        pumps: [],
        pump: 'select pump',
        pumpId: '',
        userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : "",
        rolesCount: 0,
        tableProps: {
            pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
            toolbar: ["ExcelExport", "PdfExport", "Search"],
            search: { operator: "contains", ignoreCase: true },
        },
        maxDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        customShortcuts: [
            { key: "Today", label: "Today", value: "day" },
            { key: "yesterday", label: "Yesterday", value: "-day" },
            { key: "last7Days", label: "Last 7 Days", value: 7 },
            { key: "lastWeek", label: "Last Week", value: "-isoWeek" },
            { key: "last30Days", label: "Last 30 Days", value: 30 },
            { key: "lastMonth", label: "Last Month", value: "-month" }
        ],
        startDate: this.$moment().subtract(7, "days") .format("MMMM D, YYYY"),
        endDate: this.$moment().format("MMMM D, YYYY"),
        pluginStartDate: this.$moment().subtract(7, "days") .format("MMMM D, YYYY"),
        pluginEndDate: this.$moment().format("D-M-YYYY"),
        dateRange: { "start": this.pluginStartDate, "end":this.pluginEndDate },
        pumpSale: {},
        CheckPumpSales: () => {
            return {
                template: CheckPumpSalesTemplate
            };
        },
    };
  },
  provide: {
      grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
  },
  created() {
    this.$eventHub.$on('refreshCheckPumpSales', (id) => { 
        this.checkPumpSales()
    })
    this.$eventHub.$on('editCheckPumpSale', (data) => { 
        this.pumpSale = data
        this.$modal.show('editCheckPumpSalesModal')
    })
    this.$eventHub.$on('deleteCheckPumpSale', (id) => { 
        this.deletePumpSaleCheck(id)
    })

    this.$eventHub.$on('addStatus', (id) => { 
        this.pumpId = id
        this.$modal.show('addPumpStatus')
    })
  },
  watch: {
    dateRange: function (newRange, oldRange) {
        if ( newRange.start!== "" && newRange.end !== "") {
            this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
            this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");
        }
    },
    companyId: function (newId, oldId) {
        if (newId && (newId !== oldId)) {
            this.getBranches();
            this.getDealers();
        }
    },
    branchId: function (newId) {
        if (newId && (newId !== 'select branch')) {
            this.getPumps();
        }
    }
},
  mounted() {
    this.checkPumpSales()
    this.getCompanies()
    $(".e-input").keyup(function(e) {
        searchFun(e);
    });
    function searchFun(event) {
        var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
        var value = event.target.value;
        grid.search(value);
    }
  },
 
  
  computed: {
      userName() {
          return `${this.userDetails.firstName} ${this.userDetails.lastName}`
      }
  },
  methods: {
     getPumps() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Branch/Pumps/${this.branchId}`, configObject.authConfig())
            .then(response => {
                response.data.sort((a, b) =>
                    a.displayName.toLowerCase() < b.displayName.toLowerCase()
                    ? -1
                    : a.displayName.toLowerCase() > b.displayName.toLowerCase()
                    ? 1
                    : 0
                );
                this.pumps = response.data;
            })
            .catch(error => {
            });
    },
    getCompanies() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company?PageNumber=1&PageSize=1000`, configObject.authConfig())
            .then(res => {
                this.companies = res.data.data
        })
        .catch(error => {

        });
    },
    getDealers() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company/Dealers/${this.companyId}`, configObject.authConfig())
            .then(res => {
                let index = 0
                res.data.sort((a, b) => {
                    if (a.name === b.name) {
                        return a.name > b.name ? 1 : -1;
                    }
                    return a.name > b.name ? 1 : -1;
                });
                this.dealers = res.data
            })
            .catch(error => {

            });
    },
    convertThousand(request) {
        if (!isFinite(request)) {
            return "0.00";
        }
        return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getBranches() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company/Branches/${this.companyId}`, configObject.authConfig())
            .then(res => {
                res.data.sort((a, b) => {
                    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                });
                this.branches = res.data
            })
            .catch(error => {

            });
    },
    deletePumpSaleCheck(id) {
        let resp = confirm("Are you sure want to delete this pump Sale?");
        if (!resp) {
            return
        }
        this.axios
            .delete(
                `${configObject.apiBaseUrl}/Audit/RemovePumpStatus?id=${id}`,
                configObject.authConfig(
)            )
            .then((res) => {
                this.$toast("Successfully Deleted Pump  sale", {
                    type: "success",
                    timeout: 3000,
                });
                this.checkPumpSales()
            })
            .catch((error) => {
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000,
                });
            });
    },
    checkPumpSales() {
        this.showLoader = true;
        if(this.dealer == 'select dealer') {
            this.dealer = ''
        }
        if(this.branchId == 'select branch') {
            this.branchId = ''
        }
        if(this.companyId == 'select company') {
            this.companyId = ''
        }
        if(this.pump == 'select pump') {
            this.pump = ''
        }
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Audit/CheckPumpSales?StartDate=${this.startDate}&EndDate=${this.endDate}&Lower=${this.lower}&Higher=${this.higher}&DealerId=${this.dealer}&PumpId=${this.pump}&BranchId=${this.branchId}&CompanyId=${this.companyId}&BranchName=${this.branchName}&DeviceId=${this.deviceId}`, configObject.authConfig())
            .then(res => {
                res.data.forEach(el => {
                    el.price = this.convertThousand(el.price)
                    el.dateOpened = this.$moment(el.dateOpened).format('YYYY-MM-DD HH:mm:ss')
                    el.dateModified = this.$moment(el.dateModified).format('YYYY-MM-DD HH:mm:ss')
                    el.openingReadingFormatted = this.convertThousand(el.openingReading)
                    el.lastReadingFormatted = this.convertThousand(el.lastReading)
                })
                this.$refs.dataGrid.ej2Instances.setProperties({
                    dataSource: res.data
                });
                this.refreshGrid();
                this.showLoader = false;
            })
            .catch(error => {
                this.showLoader = false;
            });
    },
    refreshGrid() {
        this.$refs.dataGrid.refresh();
    },
    toolbarClick(args) {
        switch (args.item.text) {
            case "PDF Export":
            let pdfExportProperties = {
                pageOrientation: 'Landscape',
                fileName: "Roles"
            }
            this.$refs.dataGrid.pdfExport();
            break;
            case "Excel Export":
            this.$refs.dataGrid.excelExport();
            break;
        }
    },
  }
};
</script>

<style>
@media screen and (max-width: 602px) {
  .editPumpStat .v--modal-box.v--modal {
      top: 68px !important;
      margin: 0 auto !important;
      width: 90% !important;
      height: 550px !important;
      left: 0 !important;
      overflow-y: auto;
  }
}
</style>
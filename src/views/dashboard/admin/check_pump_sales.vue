<template>
  <masterLayout>
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
    </div>
    <div class="new_row_section row">
        <div class="row">
            <div class="col-md-6">
                <div class="input__block">
                    <input type="text" placeholder="Lower" class="" name="Name" v-model="lower" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="input__block">
                    <input type="text" placeholder="Higher" class="" name="Name" v-model="higher"  />
                </div>
            </div>
            <div class="row">
            <div class="col-md-6">
                <div class="input__block">
                    <input type="text" placeholder="Branch Name" class="" name="City"  />
                </div>
            </div>
            <div class="col-md-6">
                <div class="input__block">
                    <input type="text" placeholder="Higher" class="" name="Name" v-model="higher"  />
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="pumps_diagnostics">
            <div class="row mt-3">
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <input type="text" placeholder="Lower" class="" name="Name" v-model="lower" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <input type="text" placeholder="Higher" class="" name="Name" v-model="higher"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <input type="text" placeholder="Branch Name" class="" name="City"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                 <input type="text" placeholder="Device ID" class=""  />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="row mt-3">
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select v-model="branchId" class="form-control">
                                    <option disabled selected value="select company">select branch</option>
                                    <option :value="cp.id" v-for="(cp,i) in branches" :key='i'>{{cp.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select v-model="companyId" class="form-control" @change="getBranchId">
                                    <option disabled selected value="select company">select company</option>
                                    <option :value="cp.id" v-for="(cp,i) in companies" :key='i'>{{cp.name}}</option>
                                    {{companies}}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select class="form-control" name="dealerId" >
                                    <option value="select a dealer" disabled>select a dealer</option>
                                    <option value="Nigeria">Dealer 1</option>
                                    <option value="Kenya">Dealer 2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select class="form-control" name="dealerId" >
                                    <option value="select a pump" disabled>select a pump</option>
                                    <option value="Nigeria">Pump  1</option>
                                    <option value="Kenya">Pump 2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="col-md-6">
            
        </div>
    </div>
    <div class="new_row_section mt-3">
        <div class="pumps_diagnostics">
            <div class="row mt-3">
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                            <input type="text" placeholder="Lower" class="" name="Name" v-model="lower" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                            <input type="text" placeholder="Higher" class="" name="Name" v-model="higher"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <input type="text" placeholder="Branch Name" class="" name="City"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                 <input type="text" placeholder="Device ID" class=""  />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="row mt-3">
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select v-model="branchId" class="form-control">
                                    <option disabled selected value="select company">select branch</option>
                                    <option :value="cp.id" v-for="(cp,i) in branches" :key='i'>{{cp.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select v-model="companyId" class="form-control" @change="getBranchId">
                                    <option disabled selected value="select company">select company</option>
                                    <option :value="cp.id" v-for="(cp,i) in companies" :key='i'>{{cp.name}}</option>
                                    {{companies}}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select class="form-control" name="dealerId" >
                                    <option value="select a dealer" disabled>select a dealer</option>
                                    <option value="Nigeria">Dealer 1</option>
                                    <option value="Kenya">Dealer 2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-12">
                            <div class="input__block">
                                <select class="form-control" name="dealerId" >
                                    <option value="select a pump" disabled>select a pump</option>
                                    <option value="Nigeria">Pump  1</option>
                                    <option value="Kenya">Pump 2</option>
                                </select>
                            </div>
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
          :toolbar="tableProps.toolbar"
          :searchSettings="tableProps.search"
          :allowExcelExport="true"
          :allowPdfExport="true"
          :toolbarClick="toolbarClick"
          >
          <e-columns>
              <e-column width="80" field="index" headerText="#"></e-column>
              <e-column width="250" field="name" headerText="Role"></e-column>
             <e-column :template="rolesTemplates" headerText="Action" width="300"></e-column>
          </e-columns>
      </ejs-grid>
    <TableLoader :showLoader="showLoader"  /> 
  </div>
  </masterLayout>
</template>
<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import Temp from "@/components/list_of_roles_template.vue";
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
    TableLoader
  },
   data() {
    return {
        showLoader: false,
        companyId: 'select company',
        companies: [],
        branches: [],
        branchName: null,
        deviceId: null,
        userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
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
        startDate: this.$moment().format("MMMM D, YYYY"),
        endDate: this.$moment().format("MMMM D, YYYY"),
        pluginStartDate: this.$moment().format("D-M-YYYY"),
        pluginEndDate: this.$moment().format("D-M-YYYY"),
        dateRange: { "start": this.pluginStartDate, "end":this.pluginEndDate },
    };
  },
  provide: {
      grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
  },
  created() {
      this.$eventHub.$on('refreshRolesList', (id) => { 
          this.getRoles()
      })
  },
  watch: {
    dateRange: function (newRange, oldRange) {
        if ( newRange.start!== null && newRange.end !== null) {
            this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
            this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

            // this.getTransactions();
        }
    },
},
  mounted() {
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
    getBranchId(e) {
        console.log(e.target.value)
    },
    getCompanies() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company?PageNumber=1&PageSize=1000`, configObject.authConfig)
            .then(res => {
                console.log(res.data.data)
                this.companies = res.data.data
        })
        .catch(error => {
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
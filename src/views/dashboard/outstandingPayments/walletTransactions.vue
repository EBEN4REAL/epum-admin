<template>
  <div>
    <MasterLayout>
      <div class="fuel_consumption_row">
        <div class="card_container" style="flex: 0 0 20%;">
          <div class="row align-items-center fuel_consumption_buttons_row ">
            <div class="col-md-12 fuel_consumption_btn_div mt-3">
              <div
                class="fuel_consumption_button active_tab"
                style="height: 80px;width: 80px;"
              >
                <h3 class="text-white">{{ transactionCount }}</h3>
              </div>
              <div class="text-center voucher_type mt-2">
                Total Transactions
              </div>
            </div>
          </div>
        </div>
        <div
          class="fuel_consumption_row_right_section mr-3 vr__bg"
          :style="[
            {
              backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.92), rgb(12, 4, 31, 0.92)), url(${backgroundUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }
          ]"
        >
          <div class="row align-items-center" style="height: 100%">
            <div class="col-md-6">
              <div
                class="transaction_period_text text-center branch__sales__text"
                style="font-size: 22px;"
              >
                Wallet Transactions
              </div>
            </div>
            <div class="col-md-4 drop_down_input_group">
              <div class="drop_down_section mt-2 mr-2">
                <div class="drop_down_div align-items-center">
                  <vue-ctk-date-time-picker
                    v-model="dateRange"
                    :max-date="maxDate"
                    :range="true"
                    :autoClose="true"
                    :custom-shortcuts="customShortcuts"
                    :color="$store.getters.getDatePickerColor"
                    format="DDMMYYYY"
                    formatted="DD/MM/YYYY"
                    label="Select a date range"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section__row mt-3">
        <section>
          <div class=" mt-3">
            <div class="">
              <div class="row top_section_row" v-show="!showLoader">
                <div class="col-md-8">
                  <span>
                    <img src="@/assets/img/hand (1).png" class="mr-3" />
                    Transactions between {{ startDate }} and
                    {{ endDate }} for {{branchName}}
                  </span>
                </div>
                <div class="col-md-4 text-right"></div>
              </div>
              <ejs-grid
                v-show="!showLoader"
                ref="dataGrid"
                :dataBound="dataBound"
                :created="refreshGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="pageSettings"
                :toolbar="toolbar"
                :searchSettings="search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                :rowDataBound = "rowDataBound"
              >
                <e-columns>
                  <e-column width="60" field="index" headerText="#"></e-column>
                  <e-column field="date" width="200" headerText="Date"></e-column>
                  <e-column
                    field="amount"
                    width="150"
                    headerText="Amount"
                  ></e-column>
                  <e-column
                    field="source"
                    width="250"
                   headerText="Amount"
                  ></e-column>
                  <e-column
                    field="status"
                    width="150"
                    headerText="Amount"
                  ></e-column>
                  <e-column
                    field="walletBalance"
                    width="200"
                    headerText="Amount"
                  ></e-column>
                </e-columns>
              </ejs-grid>
              <TableLoader :showLoader="showLoader" />
            </div>
          </div>
        </section>
      </div>
    </MasterLayout>
  </div>
</template>,
  restoreFocus

<script>
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/danskebank.jpg";
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index"
import {
  Page,
  Sort,
  Toolbar,
  Search,
  ExcelExport,
  PdfExport
} from "@syncfusion/ej2-vue-grids";
import JQuery from "jquery";
 
let $ = JQuery;

export default {
  title: 'Wallet Transactions: Customer Portal',
  name: "DashboardHome",
  components: {
    masterLayout,
    TableLoader
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
  },
  data() {
    return {
        transactionCount: 0,
        branchName: this.$route.query.branchName,
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
        backgroundUrl,
        pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
        toolbar: ["ExcelExport", "PdfExport", "Search"],
        search: { operator: "contains", ignoreCase: true },
        showLoader: false,
    };
  },
  watch: {
    dateRange: function (newRange, oldRange) {
      if ( newRange.start!== null && newRange.end !== null) {
        this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
        this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

        this.getTransactions();
      }
    },
  },
  created() {
    let user = JSON.parse(localStorage.getItem("userDetails"));
    if (user.role !== 'Customer,Account Manager') {
      this.$router.push({ name: "userDashboard" });
    }

    if (localStorage.getItem("userDetails") === "null") {
      this.$router.push({ path: "/" });
    } else if (configObject.authConfig() === null) {
      window.location.reload();
    }
    this.dateRange.start = this.pluginStartDate;
    this.dateRange.end = this.pluginEndDate;
  },
  mounted() {
    this.showLoader = true
    this.getTransactions()

    $(".e-input").keyup(function(e) {
      searchFun(e);
    });
    function searchFun(event) {
      var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
      var value = event.target.value;
      grid.search(value);
    }
  },
  methods: {
    toolbarClick(args) {
      switch (args.item.text) {
        case "PDF Export":
          this.$refs.dataGrid.pdfExport();
          break;
        case "Excel Export":
          this.$refs.dataGrid.excelExport();
          break;
      }
    },
    dataBound: function() {
      this.$refs.dataGrid.autoFitColumns();
    },
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    rowDataBound: function(args) {
      if (args.data['status'] === "Debit") {
        args.row.cells[4].style.color = "red";
      } 
      if (args.data['status'] === "Credit") {
        args.row.cells[4].style.color = "green";
      } 
    },
    getTransactions() {
      this.showLoader = true
      this.axios
        .get(
          `${configObject.apiBaseUrl}/Branch/WalletTransactions/${this.$route.query.branchId}?startDate=${this.startDate}&endDate=${this.endDate}`,
          configObject.authConfig()
        )
        .then(response => {
          let index = 0
          response.data
            .sort((a, b) => {
              if (a.date !== b.date) {
                return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
              }
            })
          response.data.forEach(transaction => {
            index += 1
            transaction.index = index
            if (transaction.status.toLowerCase() === 'add') {
              transaction.status = 'Credit'
            }
            transaction.date = this.$moment(transaction.date).format(
              "MM/DD/YYYY hh:mm A"
            );
          })
          this.showLoader = false
          this.transactionCount = response.data.length
          this.$refs.dataGrid.ej2Instances.setProperties({
            dataSource: response.data
          });
          this.refreshGrid();
        })
        .catch(error => {
          if(error.message && error.message === 'Network Error') {
            this.$toast.open({
              message: "Network Error, Please Check Your Internet Connection",
              type: "error",
              duration: 5000
            });
          }else {
            this.$toast.open({
              message: "An Error Occured",
              type: "error",
              duration: 5000
            });
          }
        });
    },
    decimalThousand(request) {
      if (!isFinite(request)) {
        return "0.00";
      }
      return request
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<template>
  <div>
    <masterLayout>
      <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total Transactions</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/wallet.svg" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{transactionCount}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center wallet__transaction">
                        <div class="row  align-items-center justify-content-center" style="height:100%;">
                        <div class="col-md-4 ">
                            <h5>Wallet Transactions</h5>
                        </div>
                        <div class="col-md-4 mt-4">
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
                    </div>
                </div>
            </div>
                </div>
        </section>
        <div class="new_row_section mt-3">
            <div class="row top_section_row" v-show="!showLoader">
                <div class="col-md-8 mt-5">
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
            <TableLoader :showLoader="showLoader"/> 
        </div>
    </masterLayout>
  </div>
</template>,

<script>
import masterLayout from "@/views/dashboard/masterLayout";
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
          configObject.authConfig
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
          this.showLoader = false
          if(error.message && error.message === 'Network Error') {
            this.$toast("Network Error, Please Check Your Internet Connection", {
                type: "error",
                timeout: 3000
            });
          }else {
            this.$toast(error.response.data.message, {
                type: "error",
                timeout: 3000
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

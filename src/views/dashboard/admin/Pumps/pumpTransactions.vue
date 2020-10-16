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
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-6 card_inner_wrapper">
                            <h3>Total Transactions</h3>
                        </div>
                        <div class="col-md-6 mt-4">
                           <div class="drop_down_div align-items-center">
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
                </div>
        </section>

        <section class="new_row_section mt-3 pb-3">
        <div class="row" style="margin-right: 0px; mt-3 pb-3">
          <div class="col-md-4 pump_trans_mob" style="padding-right: 0px !important">
            <div class>
              <div class="pump_transaction_header_1 pupmp_trans_header text-center">
                <p class>{{ totalVolume }} Ltrs</p>
                <div class="mt-4">
                  <span>
                    <img src="@/assets/img/measure.png" width class />
                  </span>
                </div>
                <p class="mt-3">Total volume of products</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 pump_trans_mob" style="padding-right: 0px !important">
            <div class>
              <div class="pump_transaction_header_3 pupmp_trans_header">
                <p class>{{ transactionCount }}</p>
                <div class="mt-3">
                  <span>
                    <img src="@/assets/img/to-do.png" width class />
                  </span>
                </div>
                <p class="mt-4">Total number of transactions</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 pump_trans_mob" style="padding-right: 0px !important">
            <div class>
              <div class="pump_transaction_header_2 pupmp_trans_header">
                <p class>{{ averageLitre.toFixed(2) }} Ltrs</p>
                <div class="mt-3">
                  <span>
                    <img src="@/assets/img/analytics (1).png" width class />
                  </span>
                </div>
                <p class="mt-4">Average litres per transaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

        <div class="new_row_section mt-3">
            <div class="row top_section_row" v-show="!showLoader">
                <div class="col-md-8">
                <span>
                    <img src="@/assets/img/hand (1).png" class="mr-3" />
                    Retail Outlet pump transactions between {{ startDate }} and
                    {{ endDate }}
                </span>
                </div>
                <div class="col-md-4 text-right"></div>
            </div>

             <ejs-grid
                v-show="!showLoader"
                ref="dataGrid"
                :created="refreshGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="pageSettings"
                :toolbar="toolbar"
                :searchSettings="search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
              >
                <e-columns>
                  <e-column width="80" field="index" headerText="#"></e-column>
                  <e-column field="date" width="200" headerText="Date/Time"></e-column>
                  <e-column field="pumpName" width="200" headerText="Pumn Name"></e-column>
                  <e-column field="productName" width="200" headerText="Product Name"></e-column>
                  <e-column field="pricePerLitre" width="200" headerText="Price/Litre"></e-column>
                  <e-column field="openingRead" width="200" headerText="Opening Reading"></e-column>
                  <e-column field="closingRead" width="200" headerText="Closing Reading"></e-column>
                  <e-column field="priceSoldCash" width="200" headerText="Price Sold Cash"></e-column>
                  <e-column field="totalSale" width="200" headerText="Volume Dispensed"></e-column>
                  <e-column field="staffName" width="200" headerText="Dispensed By"></e-column>
                  <e-column field="salesType" width="200" headerText="Sales Type"></e-column>
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
        totalVolume: 0,
        averageLitre: 0,
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

        this.getPumpTransactions();
      }
    },
  },
  created() {
    this.dateRange.start = this.pluginStartDate;
    this.dateRange.end = this.pluginEndDate;
  },
  mounted() {
    this.showLoader = true
    this.getPumpTransactions()

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
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    getPumpTransactions() {
      this.showLoader = true;
      this.axios
        .get(
          `${configObject.apiBaseUrl}/Branch/PumpTransactions?pumpId=${this.$route.query.id}&strtDate=${this.startDate}&endDate=${this.endDate}`,
          configObject.authConfig
        )
        .then(response => {
            console.log(response.data)
          this.showLoader = false;
          let totalVol = response.data.reduce((acc, curr) => {
            return acc + curr.totalSale;
          }, 0);
          let index = 0;
          response.data.forEach(element => {
            element.index = ++index;
            element.date = this.$moment(element.date).format(
              "MM/DD/YYYY hh:mm A"
            );
            element.pricePerLitre = this.convertThousand(element.priceSold);
            element.openingRead = this.convertThousand(element.openingRead);
            element.closingRead = this.convertThousand(element.closingRead);
            element.totalSale = this.convertThousand(element.totalSale);
            element.priceSoldCash = this.convertThousand(element.priceSoldCash);
          });
          this.totalVolume = totalVol;
          this.transactionCount = response.data.length;
          this.averageLitre =
            response.data.length === 0
              ? 0
              : this.totalVolume / this.transactionCount;
          this.totalVolume = this.convertThousand(this.totalVolume);
          this.$refs.dataGrid.ej2Instances.setProperties({
            dataSource: response.data
          });
          this.refreshGrid();
        })
        .catch(error => {
          this.showLoader = false;
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

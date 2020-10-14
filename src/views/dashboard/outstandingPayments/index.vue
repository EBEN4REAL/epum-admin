<template>
  <div>
    <masterLayout>
      <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                    <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Outstanding Payments</h3>
                        </div>
                        <div class="col-md-4 mt-4">
                           <router-link :to="{name: 'makePayments'}" class="btn create_btn primary_btn">Make Payments</router-link>
                        </div>
                    </div>
                    </div>
                </div>
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total Amount</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/wallet.svg" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{ amount }}</small>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
                </div>
        </section>
        <div class="new_row_section mt-3">
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
                <e-column width="50" field="index" headerText="#"></e-column>
                <e-column
                  width="230"
                  field="branchName"
                  headerText="Branch Name"
                ></e-column>
                <e-column
                  width="230"
                  field="address"
                  headerText="Address"
                ></e-column>
                <e-column
                  width="230"
                  field="accountName"
                  headerText="Account Name"
                ></e-column>
                <e-column width="180" field="accountNumber" headerText="Account Number"></e-column>
                <e-column
                  width="250"
                  field="bank"
                  headerText="Bank Name"
                ></e-column>
                <e-column
                  width="150"
                  field="amount"
                  headerText="Amount"
                ></e-column>
                 <e-column
                  width="350"
                  :template="buttonsTemplate"
                  headerText="Actions"
                ></e-column>
              </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/> 
        </div>
      <EditDetailsModal :balance="balance" :accountName="accountName" :accountNumber="accountNumber" :bankName="bankName" :branchId="branchId" :branchName="branchName"></EditDetailsModal>
    </masterLayout>
  </div>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import {
  Page,
  Sort,
  Toolbar,
  Search,
  ExcelExport,
  PdfExport,
  Resize
} from "@syncfusion/ej2-vue-grids";
import EditDetailsModal from '@/components/modals/OutstandingPayments/editDetailsModal.vue';
import JQuery from "jquery";
let $ = JQuery;

export default {
  title: 'Outstanding Payments :: Epump Company Portal',
  name: "OutstandingPayments",
  components: {
    masterLayout,
    EditDetailsModal,
    TableLoader
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport, Resize]
  },
  data() {
    return {
      amount: 0,
      accounts: [],
      branchId: '',
      branchName: '',
      showSpinner: false,
      showLoader: false,
      bankName: '',
      accountName: '',
      accountNumber: '',
      balance: 0,
      pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
      toolbar: ["ExcelExport", "PdfExport", "Search"],
      search: { operator: "contains", ignoreCase: true },
      buttonsTemplate: function() {
          return {
            template: Vue.component("columnTemplate", {
              template:
                `<div> 
                <button class="zone_action_buttons assign_branch" v-on:click="verifyDetails(data)">{{data.updateAccountButton}}</button>
                <a :href="'/wallet-transactions?branchId=' + data.branchId + '&branchName=' + data.branchName" class="zone_action_buttons assign_branch" @click="changeRoute($event, 'wallet_transactions', data.branchId, data.branchName)">{{data.viewTransactionsButton}}</a> 
                </div>`,
              data: function() {
                return {
                  data: {}
                };
              },
              methods: {
                verifyDetails(data) {
                  this.$eventHub.$emit("setCustomerOutstandingPay", data);

                  this.$modal.show('editDetailsModal');
                },
                changeRoute($event, route, branchId, branchName) {
                  $event.preventDefault();
                  this.$eventHub.$emit("changeRoute", route, branchId, branchName);
                }
              }
            })
          };
      },
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("userDetails"));
    // if (user.role !== 'Customer,Account Manager') {
    //   this.$router.push({ name: "userDashboard" });
    // }

    this.$eventHub.$on("getBranches", () => {
      this.getBranches();
    });

    this.$eventHub.$on("changeRoute", (route, branchId, branchName) => {
      this.changeRoute(route, branchId, branchName);
    });

    this.$eventHub.$on("setCustomerOutstandingPay", (data) => {
      this.balance = data.amount
      this.accountName = data.accountName
      this.accountNumber = data.accountNumber
      this.bankName = data.bank
      this.branchId = data.branchId
      this.branchName = data.branchName
    });
  },
  beforeDestroy() {
    this.$eventHub.$off("getBranches");
    this.$eventHub.$off("changeRoute");
    this.$eventHub.$off("setCustomerOutstandingPay");
  },
  mounted() {
    this.getBranches();

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
    changeRoute(route, branchId, branchName) {
      this.$router.push({ name: route, query: {
        branchId,
        branchName
      } });
    },
    getBranches() {
      this.showLoader = true;
      this.axios
        .get(`${configObject.apiBaseUrl}​/Branch/AccountBalances?settlement=false`, configObject.authConfig)
        .then(response => {
          let amount = 0
          response.data.sort((a, b) => {
            return a.branchName > b.branchName ? 1 : b.branchName > a.branchName ? -1 : 0;
          });
          response.data.forEach((account, index) => {
            account.index = index + 1;
            amount += account.amount
          });
          this.accounts = response.data
          this.amount = amount.toFixed(2)
          this.showLoader = false;
          this.$refs.dataGrid.ej2Instances.setProperties({ dataSource: this.accounts });
          this.refreshGrid();
        })
        .catch(error => {
          if(error.message && error.message === 'Network Error') {
            this.$toast("Network Error, Please Check Your Internet Connection", {
                type: "error",
                timeout: 3000
            });
          }else {
            this.$toast("An Error Occured", {
                type: "error",
                timeout: 3000
            });
          }
        });
    },
  }
};
</script>

<style>
@media screen and (max-width: 602px) {
  .editDetailsModal .v--modal-box.v--modal {
      top: 68px !important;
      margin: 0 auto !important;
      width: 90% !important;
      height: 550px !important;
      left: 0 !important;
      overflow-y: auto;
  }
}
</style>



<template>
  <div>
    <MasterLayout>
      <div class="fuelbalance_first_row">
        <div
          class="card_container"
          :style="{
            backgroundImage: `url(${cardBackgroundUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
            backgroundSize: ' 136px'
          }"
        >
          <div class="card__header___text">
            <div>
              <h3 class="our_branches__header">{{$t('text.payments.totalAmount')}}</h3>
              <div class="dealer__icon__wrapper mt-3">
                <div class="dealer__icon__div text-center">
                  <div>
                    <img src="@/assets/img/wallet.svg" width="70%" />
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <h3>{{ amount }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div
          class="fuelbalance_first_row_right_section mr-3 money_back"
          :style="[
            {
              backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }
          ]"
        >
          <div class="our__branches__banner">
            <div class="row align-items-center section__row">
              <div class="col-md-6 text-center section___column_1">
                <h3 class="our__branches__banner__title">{{$t('text.payments.title')}}</h3>
              </div>
              <div class="col-md-6">
                <router-link :to="{name: 'make_payments'}" >
                  <button class="fund_wallet_btn">
                    <img src="@/assets/img/purse.png" width="30px" class="mr-3" />
                    {{$t('text.payments.makePayments')}}
                  </button>
              </router-link>
              </div>
              <div class="col-md-6 text-right section___column_2">
                <div class="row align-items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="mt-3 pump__details__section_2">
        <div class="row add_driver_row record__expenses">
          <div class=" col-md-12 col-lg-12 mt-3">
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
                  :headerText="$t('text.payments.branchName')"
                ></e-column>
                <e-column
                  width="230"
                  field="address"
                  :headerText="$t('text.payments.address')"
                ></e-column>
                <e-column
                  width="230"
                  field="accountName"
                  :headerText="$t('text.payments.accountName')"
                ></e-column>
                <e-column width="180" field="accountNumber" :headerText="$t('text.payments.accountNumber')"></e-column>
                <e-column
                  width="250"
                  field="bank"
                  :headerText="$t('text.payments.bankName')"
                ></e-column>
                <e-column
                  width="150"
                  field="amount"
                  :headerText="$t('text.payments.amount')"
                ></e-column>
                 <e-column
                  width="350"
                  :template="buttonsTemplate"
                  :headerText="$t('text.actionButtons.title')"
                ></e-column>
              </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
          </div>
        </div>
      </section>
      <EditDetailsModal :balance="balance" :accountName="accountName" :accountNumber="accountNumber" :bankName="bankName" :branchId="branchId" :branchName="branchName"></EditDetailsModal>
    </MasterLayout>
  </div>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/money-background.png";
import cardBackgroundUrl from "@/assets/img/Group393.svg";
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
      amount: '',
      accounts: [],
      backgroundUrl,
      branchId: '',
      branchName: '',
      showSpinner: false,
      cardBackgroundUrl,
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
    if (user.role !== 'Customer,Account Manager') {
      this.$router.push({ name: "userDashboard" });
    }

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
        .get(`${configObject.apiBaseUrl}​/Branch/AccountBalances?settlement=false`, configObject.authConfig())
        .then(response => {
          let amount = 0
          response.data.sort((a, b) => {
            return a.branchName > b.branchName ? 1 : b.branchName > a.branchName ? -1 : 0;
          });
          response.data.forEach((account, index) => {
            account.index = index + 1;
            amount += account.amount
            account.updateAccountButton = this.$t('text.payments.updateAccount')
            account.viewTransactionsButton = this.$t('text.payments.viewTransactions')
          });
          this.accounts = response.data
          this.amount = amount.toFixed(2)
          this.showLoader = false;
          this.$refs.dataGrid.ej2Instances.setProperties({ dataSource: this.accounts });
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



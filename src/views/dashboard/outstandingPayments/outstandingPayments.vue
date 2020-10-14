<template>
  <div>
    <div v-bind:class="[showSpinner ? 'show_spinner' : 'hide_spinner']">
      <div class="payment_section_holder">
        <h3 class="our_branches__header">{{$t('text.payments.processingPayments')}}</h3>
        <div>
          <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
        </div>
      </div>
    </div>
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
                <h3 class="our__branches__banner__title">{{$t('text.payments.makePayments')}}</h3>
              </div>
              <div class="col-md-6 text-center">
                <button
                  class="inverse_button"
                  @click="promptPassword"
                >
                  {{$t('text.payments.makePayments')}}
                </button>
            </div>
              <!-- <div class="col-md-6 text-right section___column_2">
                <div class="row align-items-center"></div>
              </div> -->
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
                <e-column width="50" :template="checkBoxTemplate" headerText="#" :headerTemplate="selectAllTemplate"></e-column>
                <e-column
                  width="200"
                  field="branchName"
                  :headerText="$t('text.payments.branchName')"
                ></e-column>
                <e-column
                  width="200"
                  field="address"
                  :headerText="$t('text.payments.address')"
                ></e-column>
                <e-column
                  width="220"
                  field="accountName"
                  :headerText="$t('text.payments.accountName')"
                ></e-column>
                <e-column width="130" field="accountNumber" :headerText="$t('text.payments.accountNumber')"></e-column>
                <e-column
                  width="120"
                  field="amount"
                  :headerText="$t('text.payments.amount')"
                ></e-column>
                <e-column
                  width="200"
                  :template="paymentTemplate"
                  :headerText="$t('text.payments.amountToTransfer')"
                ></e-column>
              </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
          </div>
        </div>
      </section>
      <notifications group="foo" position="bottom right" :max="1"/>
    </MasterLayout>
    <div style="position: fixed" v-bind:class="['update_modal', showUpdateModal ? 'show_update_modal' : 'hide_update_modal']">
      <p class="update_modal_text">{{$t('text.passwordPrompt.pleaseInput')}}</p>
      <input :placeholder="$t('text.passwordPrompt.password')" v-model="password" type="password" class="update_modal_input"/>
      <div class="update_modal_actions">
        <button @click="showUpdateModal = !showUpdateModal" class="update_cancel_button">{{$t('text.passwordPrompt.cancel')}}</button>
        <button @click="makePayment()" class="update_submit_button">{{$t('text.passwordPrompt.submit')}}</button> 
      </div>
    </div>
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
  PdfExport
} from "@syncfusion/ej2-vue-grids";
import JQuery from "jquery";
let $ = JQuery;

export default {
  title: 'Make Payments :: Epump Company Portal',
  name: "OutstandingPayments",
  components: {
    masterLayout,
    TableLoader
  },
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
  },
  data() {
    return {
      amount: '',
      accounts: [],
      password: '',
      showSpinner: false,
      showUpdateModal: false,
      backgroundUrl,
      cardBackgroundUrl,
      showLoader: false,
      pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
      toolbar: ["ExcelExport", "PdfExport", "Search"],
      search: { operator: "contains", ignoreCase: true },
      paymentTemplate: function() {
        return {
          template: Vue.component("columnTemplate", {
            template: `<div class="paymentInput"><input type="number" :placeholder="data.inputAmountText" v-model="data.amountToPay" v-on:change="addToArray($event, data.branchId, data.amountToPay)"/></div>`,
            data() {
              return {
                data: {}, 
              };
            },
            methods: {
              addToArray: function(e, branchId, amount) {
                this.$eventHub.$emit("addToArray", e, branchId, amount);
              }
            }
          })
        };
      },
      checkBoxTemplate: function() {
        return {
          template: Vue.component("columnTemplate", {
            template: `<div><input type="checkbox" :checked="data.checked" v-on:change="createPaymentsArray($event, data)"/></div>`,
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              createPaymentsArray: function(e, data) {
                this.$eventHub.$emit("createPaymentsArray", e, data);
              }
            }
          })
        };
      },
      selectAllTemplate: function() {
        return {
          template: Vue.component("columnTemplate", {
            template:
              '<div><input type="checkbox" id="selectAll" v-on:change="selectAll($event)"/></div>',
            data: function() {
              return {
                data: {}
              };
            },
            methods: {
              selectAll: function(e) {
                this.$eventHub.$emit("selectAll", e);
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

    this.$eventHub.$on("addToArray", (event, branchId, amount) => {
      this.addToArray(event, branchId, amount);
    });

    this.$eventHub.$on("createPaymentsArray", (event, data) => {
      this.createPaymentsArray(event, data);
    });

    this.$eventHub.$on("selectAll", event => {
      this.selectAll(event);
    });
  },
  beforeDestroy() {
    this.$eventHub.$off("addToArray");
    this.$eventHub.$off("createPaymentsArray");
    this.$eventHub.$off("selectAll");
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
    addToArray(event, branchId, amount) {
      this.accounts.forEach(cur => {
        if (cur.branchId == branchId) {
          cur.amountToPay = amount
        }
      })
    },
    selectAll(event) {
      event.preventDefault();
      let _this = this;
      if (event.target.checked) {
        // Iterate each checkbox
        $(":checkbox").each(function() {
          this.checked = true;
        });

        this.accounts.forEach(cur => {
          cur.checked = true
        })
      } else {
        $(":checkbox").each(function() {
          this.checked = false;
        });

        this.accounts.forEach(cur => {
          cur.checked = false
        })
      }
    },
    createPaymentsArray(event, data) {
      event.preventDefault();
      if (!event.target.checked) {
        this.accounts.forEach(cur => {
          if (cur.branchId == data.branchId) {
            cur.checked = false
          }
        })
        $("#selectAll").each(function() {
          this.checked = false
        })
      } else {
        this.accounts.forEach(cur => {
          if (cur.branchId == data.branchId) {
            cur.checked = true
          }
        })
        let arr = this.accounts.filter(cur => cur.checked !== true)
        if (!arr.length) {
          $("#selectAll").each(function() {
            this.checked = true
          })
        }
      }
    },
    promptPassword() {
      const filteredAccounts = this.accounts.filter(cur => cur.checked)
      if (!filteredAccounts.length) {
        this.$toast.open({
          message: this.$t('text.payments.noAccountError'),
          type: "error",
          duration: 3000
        })
        return;
      }
      for (var x of filteredAccounts) {
        if (!x.amountToPay) {
          this.$toast.open({
            message: `${this.$t('text.payments.amountMissing')} ${x.branchName}`,
            type: "error",
            duration: 3000
          })
          return
        }
        if (x.amountToPay == 0) {
          this.$toast.open({
            message: `${this.$t('text.payments.amountLow')} ${x.branchName}`,
            type: "error",
            duration: 3000
          })
          return
        }
      }
      this.showUpdateModal = true
    },
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
    changeRoute(route, accountNo, branchId, branchName, accountName, amount) {
      this.$router.push({ name: route, query: {
        accountNo, 
        branchId, 
        branchName, 
        accountName, 
        amount
      } });
    },
    makePayment() {
      if (!this.password) {
        this.$toast.open({
            message: this.$t('text.errors.passwordMissing'),
            type: "error",
            duration: 3000
          })
        return;
      }
      this.showUpdateModal = false
      this.showSpinner = true
      const filteredAccounts = this.accounts.filter(cur => cur.checked)
        .map(cur => {
          return {
            amount: cur.amountToPay ? parseFloat((parseFloat(cur.amountToPay)).toFixed(2)) : cur.amountToPay,
            branchId: cur.branchId,
            branchName: cur.branchName,
          }
        })
        const data = {
          password: this.password,
          settlements: filteredAccounts
        }
        this.axios
          .post(
            `${configObject.apiBaseUrl}/Branch/BulkSettlement`,
            data,
            configObject.authConfig()
          )
          .then((res) => {
            const errorArray = res.data.errors
            let messageInformation
            if (errorArray.length) {
              messageInformation = errorArray.join('. ')
            } 
            this.$notify({
              group: 'foo',
              title: `<i
                  class="fa fa-close align_close -right mr-2"
                  aria-hidden="true"
                ></i>`,
              text: messageInformation ? messageInformation : this.$t('text.payments.successfulPayment'),
              duration: -1000,
              type: 'success'
            });
            this.showSpinner = false
            this.getBranches()
          })
          .catch(error => {
            let errorArray 
            let messageInformation
            try {
                errorArray = JSON.parse(error.response.data.message).errors
              
              if (errorArray && errorArray.length) {
                messageInformation = errorArray.join('. ')
              } 
            } catch (error) {

            }

            this.$notify({
              group: 'foo',
              title: `<i
                  class="fa fa-close align_close -right mr-2"
                  aria-hidden="true"
                ></i>`,
              text: messageInformation ? messageInformation : error.response.data.message,
              duration: -1000,
              type: 'error'
            });
            this.showSpinner = false
          });
        this.password = ''      
    },
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    getBranches() {
      this.showLoader = true;
      this.axios
        .get(`${configObject.apiBaseUrl}​/Branch/AccountBalances?settlement=true`, configObject.authConfig())
        .then(response => {
          let amount = 0
          // this.accounts = response.data
          response.data.sort((a, b) => {
            return a.branchName > b.branchName ? 1 : b.branchName > a.branchName ? -1 : 0;
          });
          response.data.forEach((account, index) => {
            account.index = index + 1;
            amount += account.amount
            account.checked = false
            account.amountToPay = null
            account.inputAmountText = this.$t('text.payments.inputAmount')
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

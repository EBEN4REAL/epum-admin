<template>
  <div>
    <div v-bind:class="[showSpinner ? 'show_spinner' : 'hide_spinner']">
      <div class="payment_section_holder">
        <h3>Processing Payments</h3>
        <div>
          <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
        </div>
      </div>
    </div>
    <masterLayout>
      <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform making outstanding payments</p>
                        </div>
                        <div class="col-md-3 mt-4">
                           <button class="create_btn btn btn_theme"
                           @click="promptPassword"
                           >
                           Make Payment
                           </button>
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
                                >&#x20A6; {{amount}}</small>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
                </div>
        </section>
        <div class="new_row_section mt-5">
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
                  headerText="Branch Name"
                ></e-column>
                <e-column
                  width="200"
                  field="address"
                  headerText="Address"
                ></e-column>
                <e-column
                  width="220"
                  field="accountName"
                  headerText="Account Name"
                ></e-column>
                <e-column width="130" field="accountNumber" headerText="Account Number"></e-column>
                <e-column
                  width="120"
                  field="amount"
                  headerText="Amount"
                ></e-column>
                <e-column
                  width="200"
                  :template="paymentTemplate"
                  headerText="Amount To Transfer"
                ></e-column>
              </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
        </div>
    </masterLayout>

    <div style="position: fixed" v-bind:class="['update_modal', showUpdateModal ? 'show_update_modal' : 'hide_update_modal']">
      <p class="update_modal_text">Please input your password</p>
      <input placeholder="Password" v-model="password" type="password" class="update_modal_input"/>
      <div class="update_modal_actions">
        <button @click="showUpdateModal = !showUpdateModal" class="update_cancel_button">Cancel</button>
        <button @click="makePayment()" class="update_submit_button">Submit</button> 
      </div>
    </div>
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
      userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
      amount: 0,
      accounts: [],
      password: '',
      showSpinner: false,
      showUpdateModal: false,
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
  computed: {
      userName() {
          return `${this.userDetails.firstName} ${this.userDetails.lastName}`
      }
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
        this.$toast("Please select at least one account to make payment to", {
            type: "error",
            timeout: 3000
        });
        return;
      }
      for (var x of filteredAccounts) {
        if (!x.amountToPay) {
            this.$toast(`Please input an amount for ${x.branchName}`, {
                type: "error",
                timeout: 3000
            });
          return
        }
        if (x.amountToPay == 0) {
            this.$toast(`Please input an amount greater than 0 for ${x.branchName}`, {
                type: "error",
                timeout: 3000
            });
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
        this.$toast("Please input your password", {
            type: "error",
            timeout: 3000
        });
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
            configObject.authConfig
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
              text: messageInformation ? messageInformation : "Successfully Made Payment!",
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
    convertThousand(request) {
          if (!isFinite(request)) {
              return "0.00";
          }
          return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    getBranches() {
      this.showLoader = true;
      this.axios
        .get(`${configObject.apiBaseUrl}​/Branch/AccountBalances?settlement=true`, configObject.authConfig)
        .then(response => {
          let amount = 0
          response.data.sort((a, b) => {
            return a.branchName > b.branchName ? 1 : b.branchName > a.branchName ? -1 : 0;
          });
          response.data.forEach((account, index) => {
            account.index = index + 1;
            amount += account.amount
            account.checked = false
            account.amountToPay = null
            account.amount = this.convertThousand(account.amount)
          });
          this.accounts = response.data
          this.amount =  this.convertThousand(amount)
          this.showLoader = false;
          this.$refs.dataGrid.ej2Instances.setProperties({ dataSource: this.accounts });
          this.refreshGrid();
        })
        .catch(error => {
          this.showLoader = false;
          if(error.message && error.message === 'Network Error') {
            this.$toast("Network Error, Please Check Your Internet Connection", {
                type: "error",
                timeout: 3000
            });
          }else {
            if (error.response.data.message.toLowerCase() == 'your account does not have access to this data') {
              this.$toast("Your account doesn't have the required role to access this data", {
                type: "error",
                timeout: 3000
              });
            } else {
              this.$toast(error.response.data.message, {
                type: "error",
                timeout: 3000
              });
            }
          }
        });
    },
  }
};
</script>

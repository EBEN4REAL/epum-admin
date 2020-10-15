<template>
<modal class="editDetailsModal" name="editDetailsModal" transition="pop-out" :width="650" :height="650" @opened="opened" @before-close="beforeclose">
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="50" height="60"></span>
      <h4>Update Account Details</h4>
  </div>

  <div >
      <fieldset class="border p-3 form-group mt-3" style="margin: 0 auto; width: 85%">
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            Account Number
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Account Number"
                    v-model="accountNumberValue"
                />
            </div>
           
            <div ref="target_error"></div>
        </div>
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            Bank Name
            </label>
            <div class="input__block" ref="target_input_div">
                <select v-model="bankDetail" style="padding-left: 10px; padding-top: 10px; width:100%">  
                    <option v-for="(bank, index) in bankNames" :disabled="bank.bankName === 'Select a bank'"
                :key="index" v-bind:value="bank">{{bank.bankName}}</option>                      
                </select>
            </div>
           
            <div ref="target_error"></div>
        </div>
        <div class="input__group__block mt-4" v-if="updateAccount" style="margin: 0 auto; width: 50%">
            <label class="required">
            Account Name
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="text"
                    placeholder="Account Name"
                    readonly
                    v-model="accountNameValue"
                />
            </div>
           
            <div ref="target_error"></div>
        </div>

        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            Account Balance
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Account Balance"
                    v-model="accountBalance"
                />
            </div>
           
            <div ref="target_error"></div>
        </div>
        
        <div class="text-center py-3 mt-3" v-if="updateAccount">
          <button
            class="sales_target_btn text-center"
            @click="update"
            :disabled="isButtonDisabled ? true : null"
            :style="[
              isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]"
          >
            Update Account<span></span>
          </button>
          <img
            v-show="showSpinner"
            src="@/assets/img/git_loader.gif"
            width="35px"
            class="ml-3 loader"
          />
        </div>
        <div class="text-center py-3 mt-3" v-if="verifyAccount">
          <button
            class="sales_target_btn text-center"
            @click="verify"
            :disabled="isButtonDisabled ? true : null"
            :style="[
              isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]"
          >
            Verify Account<span></span>
          </button>
          <img
            v-show="showSpinner"
            src="@/assets/img/git_loader.gif"
            width="35px"
            class="ml-3 loader"
          />
        </div>
      </fieldset>
     
  </div>
  
</modal>
</template>
<script>
const MODAL_WIDTH = 850;
import configObject from "@/config";

export default {
  name: 'editDetailsModal',
  props: ['balance', 'accountName', 'accountNumber', 'bankName', 'branchId', 'branchName'], 
  data () {
    return {
      companyId: '',
      modalWidth: MODAL_WIDTH,
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false,
      verifyAccount: true,
      updateAccount: false,
      bankNames: [{bankName: 'Select a bank', bankCode: null}],
      accountNameValue: '',
      accountNumberValue: '',
      bankDetail: '',
      accountBalance: 0
    }
  },
  mounted(){
      if (localStorage.getItem("companyDetails") !== null) {
        this.companyId = JSON.parse(localStorage.getItem("companyDetails")).id;
      }
      this.getBanks()
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    getBanks() {
      this.axios
        .get(
          `${configObject.apiBaseUrl}/Branch/Banks`,
          configObject.authConfig
        )
        .then(response => { 
          response.data.unshift({bankName: 'Select a bank', bankCode: null})  
          this.bankNames = response.data;
        })
        .catch(error => {
        });
    },
    verify() {
      if (!this.accountNumberValue) {
        this.$toast(`Please input an account number for ${this.branchName}`, {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (this.bankDetail.bankName === 'Select a bank') {
        this.$toast(`Please select a bank for ${this.branchName}`, {
            type: "error",
            timeout: 3000
        });
        return;
      }
      this.showSpinner = true
      this.axios
        .get(`${configObject.apiBaseUrl}​/Transfers/GetAccount?accountNumber=${this.accountNumberValue}&bankCode=${this.bankDetail.bankCode}`, configObject.authConfig)
        .then(response => {
          this.accountNameValue = response.data.accountName
          this.verifyAccount = false
          this.updateAccount = true
          this.showSpinner = false
          this.$toast('Successfully verified account', {
            type: "success",
            timeout: 3000
          });
        })
        .catch(error => {
          this.showSpinner = false
          this.$toast(error.response.data.message, {
            type: "error",
            timeout: 3000
          });
        });
    },
    update() {
      if (!this.accountNumberValue) {
        this.$toast(`Please input an account number for ${this.branchName}`, {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (this.bankDetail.bankName === 'Select a bank') {
        this.$toast(`Please select a bank for ${this.branchName}`, {
            type: "error",
            timeout: 3000
        });
        return;
      }
      this.showSpinner = true
      let data 

      if (this.companyId) {
        data = {
          BranchId: this.branchId,
          Bank: this.bankDetail.bankName,
          BankCode: this.bankDetail.bankCode,
          AccountName: this.accountNameValue,
          AccountBalance: this.accountBalance == '' || this.accountBalance === undefined ? 0 : parseFloat(this.accountBalance),
          AccountNumber: this.accountNumberValue,
          companyId: this.companyId
        }
      } else {
        data = {
          BranchId: this.branchId,
          Bank: this.bankDetail.bankName,
          BankCode: this.bankDetail.bankCode,
          AccountName: this.accountNameValue,
          AccountBalance: this.accountBalance == '' || this.accountBalance === undefined ? 0 : parseFloat(this.accountBalance),
          AccountNumber: this.accountNumberValue,
        }
      }
      this.axios
          .post(
            `${configObject.apiBaseUrl}/Branch/MAddBranchAccount`,
            data,
            configObject.authConfig
          )
          .then((res) => {
            this.showSpinner = false
            this.verifyAccount = true
            this.updateAccount = false
            this.$modal.hide('editDetailsModal');
            this.$toast('Successfully verified account', {
                type: "success",
                timeout: 3000
            });
            this.$eventHub.$emit("getBranches");
          })
          .catch(error => {
            this.showSpinner = false
            this.$toast(error.response.data.message, {
                type: "error",
                timeout: 3000
            });
          });
    },
    opened() {
      this.accountNameValue = this.accountName
      this.accountNumberValue = this.accountNumber
      this.accountBalance = this.balance
      if (!this.bankName) {
        this.bankDetail = this.bankNames[0]
        return
      }
      for (var cur of this.bankNames) {
        if (cur.bankName.toLowerCase().includes(this.bankName.toLowerCase())) {
          this.bankDetail = cur
          break
        } else if(this.bankName.toLowerCase().includes(cur.bankName.toLowerCase())) {
          this.bankDetail = cur
          break
        } else {
          this.bankDetail = this.bankNames[0]
        }
      }
    },
    beforeclose() {
      this.verifyAccount = true
      this.updateAccount = false
    }
  }
}
</script>

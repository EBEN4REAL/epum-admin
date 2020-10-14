<template>
<modal class="editDetailsModal" name="editDetailsModal" transition="pop-out" :width="650" :height="650" @opened="opened" @before-close="beforeclose">
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="50" height="60"></span>
      <h4> {{$t('text.editAccountDetailsModal.updateDetails')}}</h4>
  </div>

  <div >
      <fieldset class="border p-3 form-group mt-3" style="margin: 0 auto; width: 85%">
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            {{$t('text.editAccountDetailsModal.accountNumber')}}
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    :placeholder="$t('text.editAccountDetailsModal.accountNumber')"
                    v-model="accountNumberValue"
                />
            </div>
           
            <div ref="target_error"></div>
        </div>
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            {{$t('text.editAccountDetailsModal.bankName')}}
            </label>
            <div class="input__block" ref="target_input_div">
                <select v-model="bankDetail" style="padding-left: 10px; padding-top: 10px; width:100%">  
                    <!-- <option disabled>Select a bank</option> -->
                    <option v-for="(bank, index) in bankNames" :disabled="bank.bankName === $t('text.editAccountDetailsModal.selectBank')"
                :key="index" v-bind:value="bank">{{bank.bankName}}</option>                      
                </select>
            </div>
           
            <div ref="target_error"></div>
        </div>
        <div class="input__group__block mt-4" v-if="updateAccount" style="margin: 0 auto; width: 50%">
            <label class="required">
            {{$t('text.editAccountDetailsModal.accountName')}}
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="text"
                    :placeholder="$t('text.editAccountDetailsModal.bankName')"
                    readonly
                    v-model="accountNameValue"
                />
            </div>
           
            <div ref="target_error"></div>
        </div>

        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            {{$t('text.editAccountDetailsModal.accountBalance')}}
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    :placeholder="$t('text.editAccountDetailsModal.amount')"
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
            {{$t('text.editAccountDetailsModal.title')}}<span></span>
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
            {{$t('text.editAccountDetailsModal.verifyAccount')}}<span></span>
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
      bankNames: [{bankName: this.$t('text.editAccountDetailsModal.selectBank'), bankCode: null}],
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
          configObject.authConfig()
        )
        .then(response => { 
          response.data.unshift({bankName: this.$t('text.editAccountDetailsModal.selectBank'), bankCode: null})  
          this.bankNames = response.data;
        })
        .catch(error => {
        });
    },
    verify() {
      if (!this.accountNumberValue) {
        this.$toast.open({
          message: `${this.$t('text.editAccountDetailsModal.accountNumberMissing')} ${this.branchName}`,
          type: "error",
          duration: 3000
        })
        return;
      }
      if (this.bankDetail.bankName === 'Select a bank') {
        this.$toast.open({
          message: `${this.$t('text.editAccountDetailsModal.bankMissing')} ${this.branchName}`,
          type: "error",
          duration: 3000
        })
        return;
      }
      this.showSpinner = true
      this.axios
        .get(`${configObject.apiBaseUrl}​/Transfers/GetAccount?accountNumber=${this.accountNumberValue}&bankCode=${this.bankDetail.bankCode}`, configObject.authConfig())
        .then(response => {
          this.accountNameValue = response.data.accountName
          this.verifyAccount = false
          this.updateAccount = true
          this.showSpinner = false
          this.$toast.open({
            message: this.$t('text.editAccountDetailsModal.successfullyVerified'),
            type: "success",
            duration: 3000
          })
        })
        .catch(error => {
          this.showSpinner = false
          this.$toast.open({
            message: error.response.data.message,
            type: "error",
            duration: 3000
          })
        });
    },
    update() {
      if (!this.accountNumberValue) {
        this.$toast.open({
          message: `${this.$t('text.editAccountDetailsModal.accountNumberMissing')} ${this.branchName}`,
          type: "error",
          duration: 3000
        })
        return;
      }
      if (this.bankDetail.bankName === 'Select a bank') {
        this.$toast.open({
          message: `${this.$t('text.editAccountDetailsModal.bankMissing')} ${this.branchName}`,
          type: "error",
          duration: 3000
        })
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
            configObject.authConfig()
          )
          .then((res) => {
            this.showSpinner = false
            this.verifyAccount = true
            this.updateAccount = false
            this.$modal.hide('editDetailsModal');
            this.$toast.open({
              message: this.$t('text.editAccountDetailsModal.successfullyUpdated'),
              type: "success",
              duration: 3000
            })
            this.$eventHub.$emit("getBranches");
          })
          .catch(error => {
            this.showSpinner = false
            this.$toast.open({
              message: error.response.data.message,
              type: "error",
              duration: 5000
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

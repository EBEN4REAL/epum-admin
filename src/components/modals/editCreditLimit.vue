<template>
<modal class="editPumpStat" name="editCreditLimit" transition="pop-out" :width="650" :height="400"  @opened="opened">
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="35" height="35"></span>
      <h4>Edit Credit Limit</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required mt-4">
                Credit Limit
            </label>
            <div class="input__block mt-2" ref="target_input_div">
                <input type="number" class="form-control" v-model="creditLimitValue" />
            </div>
        </div>
        <div class="text-center py-3 mt-5" >
          <button
            @click="update"
            class="sales_target_btn text-center"
            :disabled="isButtonDisabled ? true : null"
            :style="[
              isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]"
          >
            Edit <span></span>
          </button>
          <img
            v-show="showSpinner"
            src="@/assets/img/git_loader.gif"
            width="35px"
            class="ml-3 loader"
          />
        </div>
     
  </div>

  
</modal>
</template>
<script>
const MODAL_WIDTH = 850;

import configObject from "@/config";

export default {
    name: 'editCreditLimit',
    props: ['creditLimit'], 
    data () {
        return {
            isButtonDisabled:  false,
            showSpinner: false,
            creditLimitValue: null,
        }
    },
    created () {
        this.modalWidth = window.innerWidth < MODAL_WIDTH
        ? MODAL_WIDTH / 2
        : MODAL_WIDTH
    },
    methods: {
        opened() {
            this.creditLimitValue = this.creditLimit
        },
        update() {
            if (!this.creditLimitValue) {
                this.$toast('Please input a credit limit', {
                    type: "error",
                    timeout: 3000
                });
                return;
            }
            this.showSpinner = true
            this.isButtonDisabled = true

            let data = {
                creditLimit: parseFloat(this.creditLimitValue),
                userId: this.$route.query.id
            }
            this.axios
                .put(`${configObject.apiBaseUrl}/Admin/UpdateCreditLimit`, data,  configObject.authConfig())
                .then(response => {
                    this.showSpinner = false
                    this.isButtonDisabled = false
                    this.$toast('Successfully Edited Credit Limit', {
                        type: "success",
                        timeout: 3000
                    });
                    this.$eventHub.$emit("refreshUserDetails");
                    this.$modal.hide('editCreditLimit')
                })
                .catch(error => {
                    this.showSpinner = false
                    this.isButtonDisabled = false
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
        },
    }
}
</script>

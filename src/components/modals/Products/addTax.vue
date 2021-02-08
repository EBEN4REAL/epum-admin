<template>
<modal class="editPumpStat pb-3" name="addTax" transition="pop-out" :width="500" :height="500" >
  <div class="modal__header">
    <h5 class="text-center primary-color p-3">Add Tax</h5>
  </div>
  <div class="modal-form-wrapper">
    <form class="pb-4">
        <div class="mt-3">
            <label>Tax Name</label>
            <div class="form_input">
                <input type="text"  class="form-control"   />
            </div>
        </div>
        <div class="mt-3">
            <label>Abreviation</label>
            <div class="form_input">
                <input type="text"  class="form-control"  />
            </div>
        </div>
        <div class="mt-3">
            <label>Tax Rate(%)</label>
            <div class="form_input">
                <input type="text"  class="form-control"  />
            </div>
        </div>
        <div class="mt-3">
              <label>Description</label>
              <div class="form_input">
                  <textarea rows="4"  class="form-control"   ></textarea>
              </div>
        </div>
        <div class="mt-3">
            <label>Your Tax Number</label>
            <div class="form_input">
                <input type="text"  class="form-control"  />
            </div>
        </div>
        <!-- <div class="mt-3">
            <label class="mr-3">Show tax number on invoices</label> <input type="checkbox"   style="height: 12px"  />
        </div>
        <div class="mt-3">
            <label class="mr-3">Is this tax recoverable?</label> <input type="checkbox"   style="height: 12px"  />
        </div> -->
        <button class="rem-btn w-100 main mobile-btn-height gold_color mt-4 " 
            @click="login($event, 'verifyEmail')"
            :disabled="isButtonDisabled ? true : null"
            :style="[
                isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]">Save
            <img
                src="@/assets/img/git_loader.gif"
                style="display:none"
                width="22px"
                class="ml-3 loader"
            />
        </button>
    </form>
   </div>
</modal>
</template>
<script>
const MODAL_WIDTH = 850;
import configObject from "@/config";

export default {
  name: 'addTax',
  props: ['deviceObj'], 
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false,
      recordPumpStatusFromEp1: 'select ep1 status',
      recordPumpTransactionFromEp1: 'select ep1 transaction'
    }
  },
  watch: {
    pumpStatusObj(obj) {
      obj.todayOpening = parseFloat(obj.todayOpening.replace(/,/g, ''))   
      obj.todayClosing = parseFloat(obj.todayClosing.replace(/,/g, ''))
      obj.yesterdayClosing =  parseFloat(obj.yesterdayClosing.replace(/,/g, ''))
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
     update() {
      if (this.recordPumpStatusFromEp1 == 'select ep1 status') {
        this.$toast('Record Pump Status From Ep1 Option is Required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (this.recordPumpTransactionFromEp1 == 'select ep1 transaction') {
        this.$toast('Record Pump Transaction From Ep1 Option is Required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      this.showSpinner = true
      this.isButtonDisabled = true
      if(this.recordPumpStatusFromEp1 == 'true') {
          this.recordPumpStatusFromEp1 = true
      }else {
          this.recordPumpStatusFromEp1 = false
      }
      if(this.recordPumpTransactionFromEp1 == 'true') {
          this.recordPumpTransactionFromEp1 = true
      }else {
          this.recordPumpTransactionFromEp1 = false
      }
      let data = {
        "deviceId": this.deviceObj.deviceId,
        "recordPumpStatusFromEp1": this.recordPumpStatusFromEp1,
        "recordPumpTransactionFromEp1": this.recordPumpTransactionFromEp1
      }
      this.axios
        .post(`${configObject.apiBaseUrl}/Devices/RecordFromEp1`, data ,  configObject.authConfig())
        .then(response => {
          this.showSpinner = false
           this.isButtonDisabled = false
          this.$toast('Successfully Edited Device', {
            type: "success",
            timeout: 3000
          });
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

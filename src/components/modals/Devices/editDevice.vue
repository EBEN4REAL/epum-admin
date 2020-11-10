<template>
<modal class="editPumpStat" name="editDevicesModal" transition="pop-out" :width="650" :height="400" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="35" height="35"></span>
      <h4>Edit Device</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Record Pump Status From Ep1
            </label>
            <div class="input__block" ref="target_input_div">
                 <select class="form-control" name="Country" v-model="recordPumpStatusFromEp1">
                      <option value="select ep1 status" disabled>Record Pump Status From Ep1</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                  </select>
            </div>
        </div>
        
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Record Pump Transaction From Ep1
            </label>
            <div class="input__block" ref="target_input_div">
                <select class="form-control" name="Country" v-model="recordPumpTransactionFromEp1">
                      <option value="select ep1 transaction" disabled>Record Pump Transaction From Ep1</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                  </select>
            </div>
        </div>
        <div class="text-center py-3 mt-3" >
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
            Update <span></span>
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
  name: 'editDevicesModal',
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
        .post(`${configObject.apiBaseUrl}/Devices/RecordFromEp1`, data ,  configObject.authConfig)
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

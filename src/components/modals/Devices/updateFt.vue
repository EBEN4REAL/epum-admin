<template>
<modal class="editPumpStat" name="updateFTModal" transition="pop-out" :width="650" :height="400" @before-close="beforeclose" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="35" height="35"></span>
      <h4>Update FT</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Number of days
            </label>
            <div class="input__block" ref="target_input_div">
                  <input type="number" class="form-control" v-model="days" />
            </div>
        </div>
        
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Status
            </label>
            <div class="input__block" ref="target_input_div">
                <select class="form-control" name="Country" v-model="status">
                      <option value="selectStatus" disabled>Select a status</option>
                      <option value="start">Start</option>
                      <option value="stop">Stop</option>
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
  name: 'updateFTModal',
  props: ['fTDeviceId'], 
  data () {
    return {
      isButtonDisabled:  false,
      showSpinner: false,
      days: null,
      status: 'selectStatus'
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    update() {
        if (!this.days) {
            this.$toast('Please input number of days', {
                type: "error",
                timeout: 3000,
            });
            return
        }

        if (parseInt(this.days) > 60) {
            this.$toast('Number of days cannot be greater than 60', {
                type: "error",
                timeout: 3000,
            });
            return
        }

        if (this.status == 'selectStatus') {
            this.$toast('Please select a status', {
                type: "error",
                timeout: 3000,
            });
            return
        }

        this.isButtonDisabled = true
        this.showSpinner = true
        const data = {
            numberOfDays: parseInt(this.days),
            status: this.status,
            deviceId: this. fTDeviceId
        }

        this.axios
            .put(`${configObject.apiBaseUrl}/Configuration/UpdateFTFromDevice`, data,  configObject.authConfig)
            .then(response => {
                this.showSpinner = false
                this.isButtonDisabled = false
                this.$toast('Successfully Updated FT', {
                    type: "success",
                    timeout: 3000
                });
                this.$modal.hide('updateFTModal')
                this.$eventHub.$emit("refreshDevicesList");
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
    beforeclose() {
      this.days = null
      this.status = 'selectStatus'
    }
  }
}
</script>

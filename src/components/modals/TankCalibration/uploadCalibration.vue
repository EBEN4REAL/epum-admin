<template>
<modal class="editPumpStat" name="uploadTankCalibration" transition="pop-out" :width="500" :height="380" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="30" height="30"></span>
      <h4>Edit Calibration</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Tank ID
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="text"
                    placeholder="Tank ID"
                    v-model="tankId"
                />
            </div>
        </div>
        
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            File
            </label>
                 <input
                    style="padding: 10px; width:100%"
                    type="file"
                    placeholder="Volume"
                />
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
            Upload <span></span>
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
  name: 'uploadTankCalibration',
  props: ['tankId'], 
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false,
    }
  },
  watch: {

  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  mounted() {
  },
  methods: {
     update() {
      if (!this.calibrationObj.height) {
        this.$toast('Height is required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (!this.calibrationObj.volume) {
        this.$toast('Volume is required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      this.showSpinner = true
      this.isButtonDisabled = true
      let data = {
        "id": this.calibrationObj.id,
        "height": parseFloat(this.calibrationObj.height.replace(/,/g, '')),
        "volume": parseFloat(this.calibrationObj.volume.replace(/,/g, ''))
      }
      this.axios
        .put(`${configObject.apiBaseUrl}​/Calibration/UpdateCalibration`, data ,  configObject.authConfig)
        .then(response => {
          this.showSpinner = false
           this.isButtonDisabled = false
          this.$toast('Successfully Updated Pump Status', {
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

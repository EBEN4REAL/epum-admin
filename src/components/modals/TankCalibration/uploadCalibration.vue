<template>
<modal class="editPumpStat" name="uploadTankCalibration" transition="pop-out" :width="500" :height="380" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="30" height="30"></span>
      <h4>Upload Calibration Sheet</h4>
  </div>
  <form>
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
                    <b-form-file
                        v-model="file"
                        :state="Boolean(file)"
                        placeholder="Upload Calibration Sheet"
                        accept="image/jpeg, image/png, image/gif">
                    </b-form-file>
            </div>
            <div class="text-center py-3 mt-3" >
            <button
                @click="upload"
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
  </form>

  
</modal>
</template>
<script>
const MODAL_WIDTH = 850;
import configObject from "@/config";
import Jquery from "jquery";
let $ = Jquery;

export default {
  name: 'uploadTankCalibration',
  props: ['tankId'], 
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false,
      file: []
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
    upload(event){
      event.preventDefault()
       if(!this.tankId) {
          this.$toast("Tank ID is required", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
     
      let formData = new FormData()
      formData.append('file', this.file)
      $('.loader').show();
      this.axios.post(`${configObject.apiBaseUrl}/Calibration/Upload/${this.tankId}`,formData, configObject.authConfigForUpload)
          .then(res => {
                this.$toast("File  Upload successful", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
                this.$eventHub.$emit('refreshCalibrationList')
                this.$modal.hide('uploadTankCalibration')
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast(error.response.data.message, {
                  type: "error",
                  timeout: 3000
              });
          });
    },
  }
}
</script>


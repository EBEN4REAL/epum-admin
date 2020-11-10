<template>
<modal class="editPumpStat" name="tankVolumeModal" transition="pop-out" :width="650" :height="400" @before-close="beforeclose" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="35" height="35"></span>
      <h4>Tank Volume</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Product Height
            </label>
            <div class="input__block" ref="target_input_div">
                  <input type="number" class="form-control" v-model="productHeight" />
            </div>
        </div>
        
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Water Height
            </label>
            <div class="input__block" ref="target_input_div">
                  <input type="number" class="form-control" v-model="waterHeight" />
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
  name: 'tankVolumeModal',
  props: ['tankId'], 
  data () {
    return {
      isButtonDisabled:  false,
      showSpinner: false,
      productHeight: null,
      waterHeight: null
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    update() {
        if (!this.productHeight) {
            this.$toast('Please input a product height', {
                type: "error",
                timeout: 3000,
            });
            return
        }

        if (!this.waterHeight) {
            this.$toast('Please input a water height', {
                type: "error",
                timeout: 3000,
            });
            return
        }

        return
        this.axios
            .get(`${configObject.apiBaseUrl}/Calibration/Volume/${this.tankId}/${parseInt(this.productHeight)}/${parseInt(this.waterHeight)}`, configObject.authConfig)
            .then(response => {
                this.showSpinner = false
                this.isButtonDisabled = false
                this.$toast('Successfully Updated FT', {
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
    beforeclose() {
      this.productHeight = null
      this.waterHeight = null
    }
  }
}
</script>

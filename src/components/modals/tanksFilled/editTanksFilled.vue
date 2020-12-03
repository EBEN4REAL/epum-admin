<template>
<modal class="editPumpStat" name="editTankFill" transition="pop-out" :width="500" :height="450" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="50" height="60"></span>
      <h4>Edit Tank Filled</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Opening Deep
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Opening Deep"
                    v-model="tankFillInfo.openingDeep"
                />
            </div>
        </div>
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Closing Deep
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Closing Deep"
                    v-model="tankFillInfo.closingDeep"
                />
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
  name: 'editTankFill',
  props: ['tankFillInfo'], 
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false
    }
  },
  watch: {
    tankFillInfo(obj) {
      obj.openingDeep = parseFloat(obj.openingDeep.replace(/,/g, ''))   
      obj.closingDeep = parseFloat(obj.closingDeep.replace(/,/g, ''))
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
     update() {
      if (!this.tankFillInfo.openingDeep) {
        this.$toast('Opening Reading is Required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (!this.tankFillInfo.closingDeep) {
        this.$toast('Current Closing Reading is Required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
     
      this.showSpinner = true
      this.isButtonDisabled = true
      let data = {
        "id": this.tankFillInfo.id,
        "closingDeep": parseFloat(this.tankFillInfo.closingDeep),
        "openingDeep": parseFloat(this.tankFillInfo.openingDeep),
      }
      console.log(data)
      this.axios
        .put(`${configObject.apiBaseUrl}​/Audit/UpdateTankFills`, data ,  configObject.authConfig())
        .then(response => {
          this.showSpinner = false
           this.isButtonDisabled = false
          this.$toast('Successfully Updated Tank Fills', {
            type: "success",
            timeout: 3000
          });
          this.$modal.hide('editTankFill')
          this.$eventHub.$emit("refreshTankFillTable");
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

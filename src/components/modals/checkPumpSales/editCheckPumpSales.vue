<template>
<modal class="editPumpStat" name="editCheckPumpSalesModal" transition="pop-out" :width="500" :height="380" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="30" height="30"></span>
      <h4>Edit pump Sale</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Opening Reading 
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Opening Reading"
                    v-model="pumpSale.openingReading"
                />
            </div>
        </div>
        
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Closing Reading 
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="nuumber"
                    placeholder="Closing Reading"
                    v-model="pumpSale.lastReading"
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
  name: 'editCheckPumpSalesModal',
  props: ['pumpSale'], 
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false
    }
  },
   watch: {
    pumpSale(obj) {
      obj.openingReading = parseFloat(obj.openingReading.replace(/,/g, ''))   
      obj.lastReading = parseFloat(obj.lastReading.replace(/,/g, ''))
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
     update() {
      if (!this.pumpSale.openingReading) {
        this.$toast('Opening Reading is required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (!this.pumpSale.lastReading) {
        this.$toast('closing Reading is required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      this.showSpinner = true
      this.isButtonDisabled = true
      let data = {
        "id": this.pumpSale.id,
        "opening": parseFloat(this.pumpSale.openingReading),
        "closing": parseFloat(this.pumpSale.lastReading)
    }
    this.axios
    .put(`${configObject.apiBaseUrl}​/Audit/UpdatePumpStatus`, data ,  configObject.authConfig)
    .then(response => {
        this.showSpinner = false
        this.isButtonDisabled = false
        this.$toast('Successfully Updated Punmp Sale', {
        type: "success",
        timeout: 3000
        });
        this.$modal.hide('editCheckPumpSalesModal')
        this.$eventHub.$emit('refreshCheckPumpSales')
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

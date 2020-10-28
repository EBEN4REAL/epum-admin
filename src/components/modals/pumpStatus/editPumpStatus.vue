<template>
<modal class="editPumpStat" name="editPumpStatusModal" transition="pop-out" :width="650" :height="600" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="50" height="60"></span>
      <h4>Edit Punmp status</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            Opening Reading
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Opening Reading"
                    v-model="pumpStatusObj.todayOpening"
                />
            </div>
        </div>
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            Current Closing Reading
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Current Closing Reading"
                    v-model="pumpStatusObj.todayClosing"
                />
            </div>
        </div>
        
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            Yesterday Closing Reading
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="nuumber"
                    placeholder="Yesterday Closing Reading"
                    v-model="pumpStatusObj.yesterdayClosing"
                />
            </div>
        </div>
         <div class="input__group__block mt-4" style="margin: 0 auto; width: 50%">
            <label class="required">
            Multiplier
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    placeholder="Multiplier"
                    v-model="pumpStatusObj.totalMultiplier"
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
  name: 'editPumpStatusModal',
  props: ['pumpStatusObj'], 
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false
    }
  },
  watch: {
    pumpStatusObj(obj) {
      obj.todayOpening = parseFloat(obj.todayOpening.replace(/,/g, ''))   
      obj.todayClosing = parseFloat(obj.todayClosing.replace(/,/g, ''))
      obj.yesterdayClosing =  parseFloat(obj.yesterdayClosing.replace(/,/g, ''))
    }
  },
  mounted(){
    console.log(this.pumpStatusObj)
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
     update() {
      if (!this.pumpStatusObj.todayOpening) {
        this.$toast('Opening Reading is Required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (!this.pumpStatusObj.todayClosing) {
        this.$toast('Current Closing Reading is Required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      if (!this.pumpStatusObj.yesterdayClosing) {
        this.$toast('Current Closing Reading is Required', {
            type: "error",
            timeout: 3000
        });
        return;
      }
      this.showSpinner = true
      let data = {
        "id": this.pumpStatusObj.id,
        "opening": this.pumpStatusObj.todayOpening,
        "closing": this.pumpStatusObj.todayOpening,
        "yesterdayClosing": this.pumpStatusObj.yesterdayClosing,
        "multiplier":  parseFloat(this.pumpStatusObj.totalMultiplier),
      }
      console.log(data)
      this.axios
        .post(`${configObject.apiBaseUrl}​/Admin/UpdatePumpStatus`, data ,  configObject.authConfig)
        .then(response => {
          this.showSpinner = false
          this.$toast('Successfully Updated Pump Status', {
            type: "success",
            timeout: 3000
          });
        })
        .catch(error => {
          this.showSpinner = false
          this.$toast(error.response.data.message, {
            type: "error",
            timeout: 3000
          });
        });
    },
  }
}
</script>

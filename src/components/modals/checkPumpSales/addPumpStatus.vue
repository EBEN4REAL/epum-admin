<template>
<modal class="editPumpStat" name="addPumpStatus" transition="pop-out" :width="600" :height="600">
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="30" height="30"></span>
      <h4>Add Pump Status</h4>
  </div>
   <div >
       <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Date 
            </label>
            <div class="input__block" ref="target_input_div">
                 <vue-ctk-date-time-picker
                    id="DateTimePicker"
                    v-model="date"
                    color="#290C53"
                    format="YYYY-MM-DDTHH:mm:ss.sssZ"
                    formatted="DD/MM/YYYY h:mm a"
                    label="Select date and time"
                />
            </div>
        </div>
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Opening Reading 
            </label>
            <div class="input__block" ref="target_input_div">
                 <input
                    style="padding: 10px; width:100%"
                    type="number"
                    v-model="openingReading"
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
                    v-model="closingReading"
                />
            </div>
        </div>

        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required mr-2">
            Close 
            </label>
            <input
              type="checkbox"
              v-model="close"
          />
        </div>

        <div class="text-center py-3 mt-3" >
          <button
            @click="addStatus"
            class="sales_target_btn text-center"
            :disabled="isButtonDisabled ? true : null"
            :style="[
              isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]"
          >
            Add Status <span></span>
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
  name: 'addPumpStatus',
  props: ['pumpId'],
  data () {
    return {
        date: '',
        openingReading: null,
        closingReading: null,
        close: false,
        isButtonDisabled: false,
        showSpinner: false, 
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    toggleIsClosed() {
      this.close = !this.close
    },
    addStatus() {
        if(!this.date) {
            this.$toast("Please select a date", {
                type: "error", 
                timeout: 3000
            });
            return;
        }

        if(!this.openingReading) {
            this.$toast("Please input an Opening Reading", {
                type: "error", 
                timeout: 3000
            });
            return;
        }

        if(!this.closingReading) {
            this.$toast('Please input a Closing Reading', {
                type: "error", 
                timeout: 3000
            });
            return;
        }

      
        const data = {
            pumpId: this.pumpId,
            opening: parseFloat(this.openingReading),
            closing: parseFloat(this.closingReading),
            date: this.date,
            close: this.close
        }

        $('.loader').show();
        this.isButtonDisabled = true;

        this.axios.post(`${configObject.apiBaseUrl}/Audit/AddPumpStatus`, data, configObject.authConfig())
            .then(res => {
                    this.$toast("Successfully Added Pump Status", {
                        type: "success",
                        timeout: 3000
                    });
                    this.isButtonDisabled = false;
                    this.openingReading = null
                    this.closingReading = null
                    this.date = null
                    this.close = false
                    $('.loader').hide();
                    this.$modal.hide('addPumpStatus')
                    this.$eventHub.$emit('refreshCheckPumpSales')
            })
            .catch(error => {
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000
                });
            });
    }
  }
}
</script>

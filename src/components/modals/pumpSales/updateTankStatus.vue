<template>
<modal class="editPumpStat" name="updateTankStatus" transition="pop-out" :width="650" :height="600" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="20" height="20"></span>
      <h4>Update Tank status</h4>
  </div>
   <div >
        <div class="input__group__block mt-4" style="margin: 0 auto; width: 70%">
            <label class="required">
            Date
            </label>
            <div class="input__block" ref="target_input_div">
                <vue-ctk-date-time-picker
                    id="DateTimePicker"
                    v-model="tankUpdateStatusDate"
                    color="#370F70"
                    format="YYYY-MM-DD h:mm a"
                    formatted="DD/MM/YYYY h:mm a"
                />
            </div>
        </div>
        
        <div class="input__group__block mt-5" style="margin: 0 auto; width: 70%">
            <label class="required">
                Opening Dip
            </label>
            <div class="input__block" ref="target_input_div">
                  <input type="number" class="form-control" v-model="tankObj.openingDip" />
            </div>
        </div>
        <div class="input__group__block mt-5" style="margin: 0 auto; width: 70%">
            <label class="required">
                Closing Dip
            </label>
            <div class="input__block" ref="target_input_div">
                <input type="number" class="form-control" v-model="tankObj.closingDip" />
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
  name: 'updateTankStatus',
  props: ['tankObj'], 
  data () {
    return {
      isButtonDisabled:  false,
      showSpinner: false,
      productHeight: null,
      waterHeight: null,
      tankUpdateStatusDate: "",
    }
  },
  mounted() {
       this.getToday();
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
   watch: {
        tankObj(obj) {
            obj.closingDip = parseFloat(obj.closingDip.replace(/,/g, '')) 
            obj.openingDip = parseFloat(obj.openingDip.replace(/,/g, ''))  
        }
    },
  methods: {
    getToday() {
        let d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(),  year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        hours = hours < 10 ? "0" + hours : hours;
        var strTime = hours + ':' + minutes + ' ' + ampm;


        let todaysDate =  [year, month, day].join('-') + " " + strTime;
        this.tankUpdateStatusDate = todaysDate;
    },
   
    update() {
        if (!this.tankObj.openingDip) {
            this.$toast('Please input a tank opening dip', {
                type: "error",
                timeout: 3000,
            });
            return
        }

       if (!this.tankObj.closingDip) {
            this.$toast('Please input a tank closing dip', {
                type: "error",
                timeout: 3000,
            });
            return
        }
        const dateTime = this.$moment(`${this.tankUpdateStatusDate}`).format('YYYY-MM-DD HH:mm:ss');
        let newDateTime = new Date(dateTime);
        let updatedDateTime = new Date(newDateTime.setHours(newDateTime.getHours() + 1)).toISOString();
        let date = updatedDateTime;

        let data = {
            "tankId": this.tankObj.tankId,
            "date": date,
            "openingDeep": this.tankObj.openingDip,
            "closingDeep": this.tankObj.closingDip
        }
        this.isButtonDisabled = true
        this.axios
            .put(`${configObject.apiBaseUrl}/Audit/UpdateTankStatus`,data, configObject.authConfig)
            .then(response => {
                this.showSpinner = false
                this.isButtonDisabled = false
                this.$toast('Successfully Updated Tank Status', {
                    type: "success",
                    timeout: 3000
                });
                this.$modal.hide('updateTankStatus')
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

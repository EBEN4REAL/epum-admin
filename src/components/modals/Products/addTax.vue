<template>
<modal class="editPumpStat pb-3" name="addTax" transition="pop-out" :width="500" :height="500" >
  <div class="modal__header">
    <h5 class="text-center text-white p-3">Add Tax</h5>
  </div>
  <div class="modal-form-wrapper">
    <form class="pb-4">
        <div class="mt-3">
            <label>Tax Name</label>
            <div class="form_input">
                <input type="text"  class="form-control" v-model="taxName"  />
            </div>
        </div>
        <div class="mt-3">
            <label>Abreviation</label>
            <div class="form_input">
                <input type="text"  class="form-control"  v-model="taxAbbrevation" />
            </div>
        </div>
        <div class="mt-3">
            <label>Tax Rate(%)</label>
            <div class="form_input">
              <input type="text"  class="form-control" v-model="rate"  />
            </div>
        </div>
        <div class="mt-3">
              <label>Description</label>
              <div class="form_input">
                <textarea rows="4"  class="form-control"  v-model="description" ></textarea>
              </div>
        </div>
        <div class="mt-3">
            <label>Your Tax Number</label>
            <div class="form_input">
                <input type="text"  class="form-control" v-model="taxNumber" />
            </div>
        </div>
        <button class="rem-btn w-100 main mobile-btn-height gold_color mt-4 " 
            @click="addTax"
            :disabled="isButtonDisabled ? true : null"
            :style="[
                isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]">Add
            <img
                src="@/assets/img/git_loader.gif"
                style="display:none"
                width="22px"
                class="ml-3 loader"
            />
        </button>
    </form>
   </div>
</modal>
</template>
<script>
const MODAL_WIDTH = 850;
import configObject from "@/config";

export default {
  name: 'addTax',
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false,
      taxName: '',
      taxAbbrevation: '',
      description: '',
      rate: '',
      taxNumber: ''
    }
  },
  watch: {

  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    addTax(event) {
      event.preventDefault()
      if(!this.taxName) {
          this.$toast("Please input a tax name", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.taxAbbrevation) {
          this.$toast("Please input a tax abbreviation", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.rate) {
          this.$toast("Please input a tax rate", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.description) {
          this.$toast("Please input a description", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.taxNumber) {
          this.$toast("Please input a tax number", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      
      const data = {
          "taxName": this.taxName,
          "taxAbbreviation": this.taxAbbrevation,
          "description": this.description,
          "rate": parseFloat(this.rate),
          "taxNumber": this.taxNumber
      }
      $('.loader').show();
      this.isButtonDisabled = true;

      this.axios.post(`${configObject.apiBaseUrl}/Invoices/taxes`, data, configObject.authConfig())
          .then(res => {
                this.$toast("Successfully added tax", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
                this.$modal.hide('addTax')
                this.$eventHub.$emit("refreshTaxes");
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

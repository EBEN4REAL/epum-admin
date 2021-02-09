<template>
<modal class="editPumpStat pb-3" name="editTax" transition="pop-out" :width="500" :height="500" >
  <div class="modal__header">
    <h5 class="text-center text-white p-3">Edit Tax</h5>
  </div>
  <div class="modal-form-wrapper">
    <form class="pb-4">
        <div class="mt-3">
            <label>Tax Name</label>
            <div class="form_input">
                <input type="text"  class="form-control" v-model="tax.taxName"  />
            </div>
        </div>
        <div class="mt-3">
            <label>Abreviation</label>
            <div class="form_input">
                <input type="text"  class="form-control"  v-model="tax.taxAbbrevation" />
            </div>
        </div>
        <div class="mt-3">
            <label>Tax Rate(%)</label>
            <div class="form_input">
              <input type="text"  class="form-control" v-model="tax.rate" disabled />
            </div>
        </div>
        <div class="mt-3">
              <label>Description</label>
              <div class="form_input">
                <textarea rows="4"  class="form-control"  v-model="tax.description" ></textarea>
              </div>
        </div>
        <div class="mt-3">
            <label>Your Tax Number</label>
            <div class="form_input">
                <input type="text"  class="form-control" v-model="tax.taxNumber" />
            </div>
        </div>
        <button class="rem-btn w-100 main mobile-btn-height gold_color mt-4 " 
            @click="editTax"
            :disabled="isButtonDisabled ? true : null"
            :style="[
                isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]">Save
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
  name: 'editTax',
  props: ['tax'],
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false,
      taxName: '',
      taxAbbreviation: '',
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
    editTax(event) {
      event.preventDefault()
      if(!this.tax.taxName) {
          this.$toast("Please input a tax name", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.tax.taxAbbrevation) {
          this.$toast("Please input a tax abbreviation", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.tax.rate) {
          this.$toast("Please input a tax rate", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.tax.description) {
          this.$toast("Please input a description", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.tax.taxNumber) {
          this.$toast("Please input a tax number", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      
      const data = {
          "taxName": this.tax.taxName,
          "taxAbbreviation": this.tax.taxAbbrevation,
          "description": this.tax.description,
          "rate": parseFloat(this.tax.rate),
          "taxNumber": this.tax.taxNumber
      }
      $('.loader').show();
      this.isButtonDisabled = true;

      this.axios.put(`${configObject.apiBaseUrl}/Invoices/taxes/${this.tax.id}`, data, configObject.authConfig())
          .then(res => {
                this.$toast("Successfully updated tax", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
                this.$modal.hide('editTax')
                this.$eventHub.$emit("refreshTaxes");
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast('Failed to update tax', {
                  type: "error",
                  timeout: 3000
              });
          });
    }
  }
}
</script>

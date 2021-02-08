<template>
<modal class="editPumpStat pb-3" name="editProduct" transition="pop-out" :width="500" :height="500" >
  <div class="modal__header">
    <h5 class="text-center text-white p-3">Edit Product</h5>
  </div>
  <div class="modal-form-wrapper">
    <form class="pb-4">
        <div class="mt-3">
            <label>Product Name</label>
            <div class="form_input">
                <input type="text"  class="form-control" v-model="product.productName"  />
            </div>
        </div>
        <div class="mt-3">
            <label>Product Description</label>
            <div class="form_input">
                <input type="text"  class="form-control"  v-model="product.productDescription" />
            </div>
        </div>
        <div class="mt-3">
            <label>Product Price</label>
            <div class="form_input">
              <input type="text"  class="form-control" v-model="product.productPrice"  />
            </div>
        </div>
        <button class="rem-btn w-100 main mobile-btn-height gold_color mt-4 " 
            @click="editProduct"
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
  name: 'editProduct',
  props: ['product'],
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
    editProduct(event) {
        event.preventDefault()
        if(!this.product.productName) {
            this.$toast("Please input a product name", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.product.productDescription) {
            this.$toast("Please input a product description", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.product.productDescription) {
          this.$toast("Please input a product description", {
              type: "error", 
              timeout: 3000
          });
          return;
        }
      
      const data = {
        "productName": this.product.productName,
        "productDescription": this.product.productDescription,
        "productPrice": this.product.productPrice
    }
      $('.loader').show();
      this.isButtonDisabled = true;
      this.axios.put(`${configObject.apiBaseUrl}/Invoices/products/${this.product.id}`, data, configObject.authConfig())
          .then(res => {
                this.$toast("Successfully updated product", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
                this.$modal.hide('editProduct')
                this.$eventHub.$emit("refreshInvoiceProducts");
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast("Failed to delete product", {
                  type: "error",
                  timeout: 3000
              });
          });
    }
  }
}
</script>

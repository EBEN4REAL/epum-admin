<template>
<modal class="editPumpStat pb-3" name="sendInvoice" transition="pop-out" :width="500" :height="530" >
  <div class="modal__header">
    <h5 class="text-center text-white p-3">Send Invoice</h5>
  </div>
  <div class="modal-form-wrapper">
    <form class="pb-4">
        <div class="mt-3">
            <label>To</label>
            <div class="form_input">
                <input type="text" class="form-control"  v-model="to" />
            </div>
        </div>
        <div class="mt-3">
            <label>BCC</label>
            <div class="form_input">
                <input type="text" class="form-control"  v-model="bcc" />
            </div>
        </div>
        <div class="mt-3">
            <label>Subject</label>
            <div class="form_input">
              <input type="text" class="form-control" v-model="subject"  />
            </div>
        </div>
        <div class="mt-3">
              <label>Message</label>
              <div class="form_input">
                <textarea rows="5" cols="50" class="form-control" v-model="message" style="height: auto !important;"></textarea>
              </div>
        </div>
        <div class="d-flex justify-content-start align-items-center">
            <input type="checkbox" v-model="attachInvoicePdf" class="mr-4"/>
            <p style="margin-bottom: 0">Attach the invoice as a pdf</p>
        </div>
        <button class="rem-btn w-100 main mobile-btn-height gold_color mt-4 " 
            @click="sendInvoice"
            :disabled="isButtonDisabled ? true : null"
            :style="[
                isButtonDisabled
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            ]">Send
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
  name: 'sendInvoice',
  props: ['id'],
  data () {
    return {
      isButtonDisabled:  false,
      to: '',
      bcc: '',
      subject: '',
      message: '',
      attachInvoicePdf: false
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
    sendInvoice(event) {
        event.preventDefault()
        if(!this.to) {
            this.$toast("field 'To' cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.subject) {
            this.$toast("field 'Subject' cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.message) {
            this.$toast("field 'Message' cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        
        const data = {
            messageType: 0,
            sendTo: this.to,
            bcc: this.bcc,
            message: this.message,
            subject: this.subject,
            attachInvoicePdf: this.attachInvoicePdf,
            invoiceId: this.id
        }

        $('.loader').show();
        this.isButtonDisabled = true;

        this.axios.post(`${configObject.apiBaseUrl}/Invoices/send-invoice`, data, configObject.authConfig())
            .then(res => {
                    this.$toast("Successfully sent invoice", {
                        type: "success",
                        timeout: 3000
                    });
                    $('.loader').hide();
                    this.isButtonDisabled = false;
                    this.$modal.hide('sendInvoice')
                    this.$eventHub.$emit("refreshInvoicesList");
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

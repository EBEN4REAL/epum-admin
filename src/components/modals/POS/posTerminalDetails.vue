<template>
  <modal
    class="POSModal"
    name="POSModal"
    transition="pop-out"
    :width="modalWidth"
    :height="400"
    @opened="opened"
  >
    <div class="pos_modal">
        <div class="row align-items-center p-2">
            <div class="col-md-6 col-sm-3">
                <label>Vendor:</label >
            </div>
            <div class="col-md-6 col-sm-3">
                <div class="details_input">
                    <label for="">{{modalDataValues.vendor}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Transaction Limit:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">₦ {{modalDataValues.transactionLimit}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Fee:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">₦ {{modalDataValues.fee}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Terminal Id:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">{{modalDataValues.terminalId}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Service Type:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">{{modalDataValues.serviceType}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Serial No.:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">{{modalDataValues.serialNo}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Slip Header:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">{{modalDataValues.slipHeader}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Slip Footer:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">{{modalDataValues.slipFooter}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Added By:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">{{modalDataValues.addedBy}}</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2">
            <div class="col-md-6">
                <label>Date Added:</label >
            </div>
            <div class="col-md-6">
                <div class="details_input">
                    <label for="">{{modalDataValues.dateAdded}}</label>
                </div>
            </div>
        </div>
    </div>
  </modal>
</template>
<script>
import configObject from "@/config";
import JQuery from "jquery";
let $ = JQuery;

const MODAL_WIDTH = 656;

export default {
  name: "POSModal",
  props: ['modalData'],
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      isButtonDisabled: false,
      modalDataValues: {},
      pumpName: ''
    };
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    closeModal() {
      this.$modal.hide("POSModal");
    },
    opened() {
      this.modalDataValues = this.modalData
    },
  }
};
</script>

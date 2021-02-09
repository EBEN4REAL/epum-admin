<template>
  <modal
    class="POSModal"
    name="firmwareModal"
    transition="pop-out"
    :width="modalWidth"
    :height="500"
  >
    <div class="pos_modal">
        <div class="row align-items-center p-2">
            <div class="col-md-6 col-sm-3">
                <label style="font-size: 20px;">Firware Version</label >
            </div>
            <div class="col-md-6 col-sm-3">
                <div class="details_input">
                    <label style="font-size: 20px;">Total Number</label>
                </div>
            </div>
        </div>
        <div class="row align-items-center p-2"  v-for="(value, key, index) in versions" :key="index">
            <div class="col-md-6 col-sm-3">
                <label>FW {{key}}:</label >
            </div>
            <div class="col-md-6 col-sm-3">
                <div class="details_input">
                    <label for="">{{value}}</label>
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
  name: "firmwareModal",
  props: ['versions'],
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
      this.$modal.hide("firmwareModal");
    },
    // opened() {
    //   this.modalDataValues = this.modalData
    // },
  }
};
</script>

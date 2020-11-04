<template>
<modal class="editPumpStat" name="timestampModal" transition="pop-out" :width="400" :height="300" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="40" height="40"></span>
      <h4>Timestamp Details</h4>
  </div>
   <div class="py-5 text-center">
       <h4>{{timestamp}}</h4>
  </div>

  
</modal>
</template>
<script>
const MODAL_WIDTH = 850;
import configObject from "@/config";

export default {
  name: 'timestampModal',
  props: ['timestamp'], 
  data () {
    return {
      isButtonDisabled:  false,
      showLoader: false,
      showSpinner: false
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
   
  }
}
</script>

<template>
<modal class="editPumpStat" name="volumeCalibration" transition="pop-out" :width="650" :height="350" >
  <div class="modal__header">
      <span class="mr-3"><img src="@/assets/img/building (1).svg" width="40" height="40"></span>
      <h4>Volume Calibration</h4>
  </div>
   <div class="py-5" style="width: 90%; margin: 0 auto">
       <div class="row">
           <div class="col-md-6">
               <h4>Product Volume: </h4>
           </div>
           <div class="col-md-6">
               <h4 class="">{{convertThousand(calibrationObj.productVolume)}} Litres</h4>
           </div>
       </div>
        <div class="row mt-4">
           <div class="col-md-6">
               <h4>Water Volume: </h4>
           </div>
           <div class="col-md-6">
               <h4 class="">{{convertThousand(calibrationObj.waterVolume)}} Litres</h4>
           </div>
       </div>
  </div>

  
</modal>
</template>
<script>
const MODAL_WIDTH = 850;
import configObject from "@/config";

export default {
  name: 'volumeCalibration',
  props: ['calibrationObj'], 
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
      convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
  }
}
</script>

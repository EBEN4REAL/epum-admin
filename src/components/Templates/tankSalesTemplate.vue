<template>
   <div class="">
    <router-link :to="{name:'tank_calibration', query: {tankId: data.tankId}}" class="btn details_btn mr-3">
        Check Calibration
    </router-link>
    <router-link :to="{name:'calibrationVolume', query: {tankId: data.tankId}}" class="btn details_btn mr-3">
        Calibration Volume
    </router-link>
    <!-- <router-link :to="{name:'update_tank_status', query: {tankId: data.tankId}}" class="btn details_btn mr-3">
        Update Tank Status
    </router-link> -->
    <div class="btn details_btn mr-3" @click="updateTankStatusModal">
        Update Tank Status
    </div>
    <div class="btn details_btn mr-3" @click="removeTankCalibration">
        Remove Calibration
    </div>
  </div>
</template>

<script>
import configObject from "@/config";
import Jquery from "jquery";
let $ = Jquery;

export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    updateTankStatusModal() {
      this.$eventHub.$emit('updateTankStatusModal', this.data)
    },
    showVolumeModal() {
      this.$eventHub.$emit('showVolumeModal', this.data.tankId)
    },
    removeTankCalibration() {
      this.$eventHub.$emit('removeTankCalibration', this.data.tankId)
    },
  }
};
</script>
<template>
   <div class="">
    <router-link :to="{name:'tank_calibration', query: {tankId: data.tankId}}" class="btn details_btn mr-3">
      Check Calibration
    </router-link>

    <div class="btn details_btn mr-3" @click="showVolumeModal">
      Volume
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
    showVolumeModal() {
      this.$eventHub.$emit('showVolumeModal', this.data.tankId)
    },
    removeTankCalibration() {
      this.$eventHub.$emit('removeTankCalibration', this.data.tankId)
    },
  }
};
</script>
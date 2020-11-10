<template>
   <div class="">
    <router-link :to="{name:'tank_calibration', query: {tankId: data.tankId}}" class="btn details_btn mr-3">
      Check Calibration
    </router-link>
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
};
</script>
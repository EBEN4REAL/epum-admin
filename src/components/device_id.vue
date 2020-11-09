<template>
   <div class="">
    <a :href="`/dump-data?id=${data.deviceId}`"  target="_blank">
      {{data.deviceId}}
    </a>
    <!-- <p style="display: none" class="nozzles_text">{{data.nozzles}}</p> -->

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
<template>
   <div class="">
    <a :href="`/dump-data?id=${data.deviceId}`"  target="_blank">
      {{data.deviceId}}
    </a>

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
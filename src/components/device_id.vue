<template>
   <div class="">
    <router-link :to="{name:'dumpedData', query: {id: data.deviceId}}" style="text-decoration: none;">
      {{data.deviceId}}
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
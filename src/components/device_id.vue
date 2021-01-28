<template>
   <div class="">
     
    <a :href="`/tanks-dump-data?id=${data.deviceId}&status=${data.nozzles ? 'pump' : 'tank'}`"  target="_blank" class="remove_underline" style="text-decoration: none !important" v-if="data.status === 'tank'"> 
      {{data.deviceId}}
    </a>
    <a :href="`/pumps-dump-data?id=${data.deviceId}&status=${data.nozzles ? 'pump' : 'tank'}`"  target="_blank" class="remove_underline" style="text-decoration: none !important" v-if="data.status === 'pump'"> 
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
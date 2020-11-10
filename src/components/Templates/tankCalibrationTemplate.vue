<template>
   <div class="">
    <router-link :to="{name:'tank_calibration', query: {id: data.id}}" class="btn details_btn mr-3">
      Edit
    </router-link>
    <router-link :to="{name:'tank_calibration', query: {id: data.id}}" class="btn details_btn mr-3">
      Delete
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
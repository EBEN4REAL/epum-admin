<template>
  <div class="">
    <button class="text-center var_btn" @click="toggledData()">
        <i class="fa fa-eye"></i>
    </button>
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

  },
};

</script>
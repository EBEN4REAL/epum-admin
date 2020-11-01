<template>
  <div class="">
    <button class="btn" :class="data.status === 'Ok' ? 'btn-success' : data.status === 'Unreachable' ? 'btn-info' : 'btn-warning'">
        {{data.status === 'Ok' ? 'OK' : data.status === 'Unreachable' ? 'Unreachable' : 'Open Mismatch	'}} 
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
  }
};

</script>
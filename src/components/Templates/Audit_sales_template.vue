<template>
  <div class="">
    <router-link :to="{name:'pump_variance_report',  query: {branchId: data.branchId, varianceId: data.index, companyId: this.$route.query.companyId}}" class="btn details_btn mr-3">
      Details
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
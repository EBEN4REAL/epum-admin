<template>
  <div class="">
    <router-link :to="{name:'editDealers', query: {dealerId: data.id}}" class="btn details_btn mr-3">
      Edit
    </router-link>

    <router-link :to="{name:'dealerDetails',  query: {dealerId: data.id}}" class="btn dealers_btn mr-3">
      Details
    </router-link>

    <router-link :to="{name:'dealer_branches', query: {dealerId: data.id, companyId: this.$route.query.companyId }}" class="btn branches_btn mr-3">
      Branches
    </router-link>

  </div>
   
</template>


<script>
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  data () {
    return {
        data: {}
    }
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
  
  }
}
</script>
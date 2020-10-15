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

    <i class="fa-li fa fa-ellipsis-v dropbtn" @click="dropdownOption()"></i>
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
    _deleteDealer($event) {
        $event.preventDefault()
        let resp = confirm("Are you sure want to delete this Dealer?");
        if(resp) {
              $(".loader").show();
              this.axios
              .delete(
              `${configObject.apiBaseUrl}/Company/DeleteDealer/${this.data.id}`, configObject.authConfig)
              .then(res => {
                    this.$toast("Dealer Deleted Successfully", {
                          type: "success",
                          timeout: 3000
                    });
                    $(".loader").hide();
                    this.$eventHub.$emit("refreshDealersTable");
              })
              .catch(error => {
                    $(".loader").hide();
                    this.$toast(error.response.data.message, {
                          type: "error",
                          timeout: 3000
                    });
              });
        }
    },
  }
}
</script>
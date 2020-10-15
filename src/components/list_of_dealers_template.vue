<template>
   <!-- <div class="btn-group btn-group-sm" role="group">
      <router-link  title="Edit" :to="{name:'editDealers', query: {dealerId: data.id}}" class="btn btn-warning" >
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </router-link> 
      <router-link  title="Details" :to="{name:'dealerDetails', query: {dealerId: data.id }}" class="btn btn-primary" >
        <i class="fa fa-info-circle" aria-hidden="true"></i>
      </router-link> 
      <router-link  title="Branches" :to="{name:'dealer_branches', query: {dealerId: data.id}}" class="btn btn-info" >
        <i class="fa fa-building-o" aria-hidden="true"></i>
      </router-link> 
      <button  title="Delete" class="btn btn-danger" @click="_deleteDealer($event)">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
  </div> -->

  <div class="">
    <router-link :to="{name:'editDealers', query: {dealerId: data.id}}" class="btn details_btn mr-3">
      Edit
    </router-link>

    <router-link :to="{name:'dealerDetails',  query: {dealerId: data.id}}" class="btn dealers_btn mr-3">
      Dealers
    </router-link>

    <router-link :to="{name:'dealer_branches', query: {dealerId: data.id}}" class="btn branches_btn mr-3">
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
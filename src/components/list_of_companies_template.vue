<template>
   <div class="btn-group btn-group-sm" role="group">
      <router-link v-b-tooltip.hover title="Edit" :to="{name:'edit_companies'}" class="btn btn-warning" >
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </router-link> 
      <router-link v-b-tooltip.hover title="Details" :to="{name:'company_details'}" class="btn btn-primary" >
            <i class="fa fa-info-circle" aria-hidden="true"></i>
      </router-link> 
      <router-link v-b-tooltip.hover title="Dealers" :to="{name:'dealers'}" class="btn btn-warning" >
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
      </router-link> 
      <router-link v-b-tooltip.hover title="Branches" :to="{name:'branches', query: {id: data.id}}" class="btn btn-info" >
            <i class="fa fa-building-o" aria-hidden="true"></i>
      </router-link> 
      <router-link v-b-tooltip.hover title="Sales Rep" :to="{name:'sales_rep'}" class="btn btn-primary" >
            <i class="fa fa-mars" aria-hidden="true"></i>
      </router-link>
      <router-link v-b-tooltip.hover title="Mail Recipient" :to="{name:'mail_recipient'}" class="btn btn-success" >
            <i class="fa fa-reply" aria-hidden="true"></i>
      </router-link>
      <button v-b-tooltip.hover title="Delete" class="btn btn-danger" @click="_deleteCompany($event)">
            <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
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

  },
  methods: {
      _deleteCompany($event) {
            $event.preventDefault()
            let resp = confirm("Are you sure want to delete this company?");
            if(resp) {
                  $(".loader").show();
                  this.axios
                  .delete(
                  `${configObject.apiBaseUrl}/Company/DeleteCompany/${this.data.id}`, configObject.authConfig)
                  .then(res => {
                        this.$toast("Company Deleted Successfully", {
                              type: "success",
                              timeout: 3000
                        });
                        $(".loader").hide();
                        this.$eventHub.$emit("refreshCompaniesList");
                  })
                  .catch(error => {
                        $(".loader").hide();
                        this.$toast("Failed to delete company", {
                              type: "error",
                              timeout: 3000
                        });
                  });
            }
    },
  }
}
</script>
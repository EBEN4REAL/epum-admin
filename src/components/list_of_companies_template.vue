<template>
  <!-- <div class="btn-group btn-group-sm" role="group">
      <router-link v-b-tooltip.hover title="Edit" :to="{name:'edit_companies', query: {companyId: data.id}}" class="btn btn-warning" >
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </router-link> 
      <router-link v-b-tooltip.hover title="Details" :to="{name:'company_details', query: {companyId: data.id}}" class="btn btn-primary" >
            <i class="fa fa-info-circle" aria-hidden="true"></i>
      </router-link> 
      <router-link v-b-tooltip.hover title="Dealers" :to="{name:'dealers',  query: {companyId: data.id}}" class="btn btn-warning" >
            <i class="fa fa-user-circle-o " aria-hidden="true"></i>
            {{data.numberOfDealers}}
      </router-link> 
      <router-link v-b-tooltip.hover title="Branches" :to="{name:'branches', query: {companyId: data.id}}" class="btn btn-info" >
            <i class="fa fa-building-o " aria-hidden="true"></i>
            {{data.numberOfBranches}}
      </router-link> 
      <router-link v-b-tooltip.hover title="Sales Rep" :to="{name:'sales_rep'}" class="btn btn-primary" >
            <i class="fa fa-mars " aria-hidden="true"></i>
      </router-link>
      <router-link v-b-tooltip.hover title="Mail Recipient" :to="{name:'mail_recipient'}" class="btn btn-success" >
            <i class="fa fa-reply " aria-hidden="true"></i>
      </router-link>
      <button v-b-tooltip.hover title="Delete" class="btn btn-danger" @click="_deleteCompany($event)">
            <i class="fa fa-trash " aria-hidden="true"></i>
      </button>
  </div> -->

  <div class="">
    <router-link :to="{name:'company_details', query: {companyId: data.id}}" class="btn details_btn mr-3">
      Details
    </router-link>

    <router-link :to="{name:'dealers',  query: {companyId: data.id}}" class="btn dealers_btn mr-3">
      Dealers
    </router-link>

    <router-link :to="{name:'branches', query: {companyId: data.id}}" class="btn branches_btn mr-3">
      Branches
    </router-link>

    <i class="fa-li fa fa-ellipsis-v dropbtn" @click="dropdownOption()"></i>
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
  mounted() {
      window.onclick = (event) => {
            if (!event.target.matches('.dropbtn')) {
                  var dropdowns = document.getElementsByClassName("dropdown-content");
                  var i;
                  for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                        }
                  }
            }
      }
      
  },
  methods: {
      dropdownOption() {
        this.$eventHub.$emit('showExtra', this.data)
      },
  },
};




// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
</script>
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
    <router-link :to="{ name: 'map_user_to_comapny' }" class="btn details_btn mr-3">
      Details
    </router-link>

    <router-link :to="{ name: 'map_user_to_comapny' }" class="btn dealers_btn mr-3">
      Dealers
    </router-link>

    <router-link :to="{ name: 'map_user_to_comapny' }" class="btn branches_btn mr-3">
      Branches
    </router-link>

    <div class="droping_down ml-4">
        <i class="fa-li fa fa-ellipsis-v dropbtn" @click="dropdownOption()"></i>
        <div class="dropdown-content" :id="[`myDropdown${data.index}`]">
            <router-link :to="{ name: 'map_user_to_comapny' }" class="">
                  Details
            </router-link>
          <hr />
            <router-link :to="{ name: 'map_user_to_comapny' }" class="">
                  Details
            </router-link>
          <hr />
            <router-link :to="{ name: 'map_user_to_comapny' }" class="">
                  Details
            </router-link>
        </div>
      </div>

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
            const old = Array.from(document.getElementsByClassName('dropdown-content'))
            old.forEach(cur => {
                  cur.classList.remove('show')
            })
            const idToUse = `myDropdown${this.data.index}`
            const option = document.getElementById(idToUse)
            option.classList.toggle("show")
            option.style.top = `${((68 * this.data.index) + 100).toString()}px`
      },
    _deleteCompany($event) {
      $event.preventDefault();
      let resp = confirm("Are you sure want to delete this company?");
      if (resp) {
        $(".loader").show();
        this.axios
          .delete(
            `${configObject.apiBaseUrl}/Company/DeleteCompany/${this.data.id}`,
            configObject.authConfig
          )
          .then((res) => {
            this.$toast("Company Deleted Successfully", {
              type: "success",
              timeout: 3000,
            });
            $(".loader").hide();
            this.$eventHub.$emit("refreshCompaniesList");
          })
          .catch((error) => {
            $(".loader").hide();
            this.$toast("Failed to delete company", {
              type: "error",
              timeout: 3000,
            });
          });
      }
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
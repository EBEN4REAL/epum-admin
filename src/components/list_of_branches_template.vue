<template>
  <div>
    <router-link
      :to="{ name: 'editBranch', query: this.$route.query.dealerId ? {companyBranchId: data.id, dealerId: this.$route.query.dealerId, companyId: this.$route.query.companyId} : {companyBranchId: data.id}}"
      class="btn details_btn mr-3"
    >Edit
    </router-link>
    <router-link
      :to="{ name: 'branchDetails', query: {companyBranchId: data.id}}"
      class="btn dealers_btn mr-3"
    >Details
    </router-link>
    <router-link :to="{ name: 'transactions', query: {companyBranchId: data.id} }"
      class="btn branches_btn mr-3"
    >Transactions
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
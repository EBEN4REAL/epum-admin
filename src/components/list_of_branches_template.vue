<template>
  <div>
    <!-- <router-link  title="Edit" :to="{ name: 'editBranch', query: {companyBranchId: data.id}}" class="btn btn-warning" > Edit
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
    </router-link> -->
    <router-link
      :to="{ name: 'editBranch', query: {companyBranchId: data.id}}"
      class="btn details_btn mr-3"
    >Edit
    </router-link>
    <router-link
      :to="{ name: 'branchDetails', query: {companyBranchId: data.id}}"
      class="btn dealers_btn mr-3"
    >Details
    </router-link>
    <router-link
      :to="{ name: 'transactions' }"
      class="btn branches_btn mr-3"
    >Transactions
    </router-link>
    <!-- <router-link
      title="Mail Recipient"
      :to="{ name: 'branchMail_recipent', query: {companyBranchId: data.id} }"
      class="btn btn-success"
    >
      <i class="fa fa-reply" aria-hidden="true"></i>
    </router-link> -->

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
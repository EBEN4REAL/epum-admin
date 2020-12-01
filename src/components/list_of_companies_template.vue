<template>
   <div class="">
    <!-- <router-link :to="{name:'edit_companies',  query: {companyId: data.id}}" class="btn details_btn mr-3">
      Edit
    </router-link> -->
    <router-link :to="{name:'newCompanyDetails', query: {companyId: data.id}}" class="btn details_btn mr-3">
      Details
    </router-link>

    <router-link :to="{name:'dealers',  query: {companyId: data.id}}" class="btn dealers_btn mr-3">
      Dealers {{data.numberOfDealers}}
    </router-link>

    <router-link :to="{name:'branches', query: {companyId: data.id}}" class="btn branches_btn mr-3">
      Retail Outlets {{data.numberOfBranches}}
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
        this.$eventHub.$emit('showExtraCompanyButtons', this.data)
      },
  },
};

</script>
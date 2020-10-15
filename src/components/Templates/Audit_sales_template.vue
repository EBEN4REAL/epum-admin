<template>
  <div class="">
    <router-link :to="{name:'edit_companies',  query: {companyId: data.id}}" class="btn details_btn mr-3">
      Edit
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

</script>
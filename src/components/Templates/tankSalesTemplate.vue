<template>
   <div class="">
    <!-- <router-link :to="{name:'update_tank_status', query: {tankId: data.tankId}}" class="btn details_btn mr-3">
        Update Tank Status
    </router-link> -->
    <div class="btn details_btn mr-3" @click="updateTankStatusModal">
        Update Tank Status
    </div>

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
    updateTankStatusModal() {
      this.$eventHub.$emit('updateTankStatusModal', this.data)
    },
    dropdownOption() {
      this.$eventHub.$emit('showExtraPumpVarianceButtons', this.data, this)
    },
  }
};
</script>
<template>
  <div class="">
    <button class="btn" :class="data.status === 'Ok' ? 'btn-success' : data.status === 'Unreachable' ? 'btn-info' : 'btn-warning'">
        {{data.status === 'Ok' ? 'OK' : data.status === 'Unreachable' ? 'Unreachable' : 'Open Mismatch	'}} 
    </button>
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
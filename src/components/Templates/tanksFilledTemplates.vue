<template>
   <div class="">
    <button class="btn details_btn mr-3" @click="editTankFill">
      Edit
    </button>

    <button  class="btn dealers_btn mr-3" @click="_deletetankFill">
      Delete 
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
        this.$eventHub.$emit('showExtraCompanyButtons', this.data)
      },
      editTankFill() {
          this.$eventHub.$emit('editTankFills', this.data)
      },
       _deletetankFill() {
        let resp = confirm("Are you sure want to delete this tank fill?");
        
        if (resp) {
            this.axios
            .delete(
                `${configObject.apiBaseUrl}/Audit/RemoveTankFills/${this.data.id}`,
                configObject.authConfig()
            )
            .then((res) => {
                this.$toast("Tank Fill Deleted Successfully", {
                  type: "success",
                  timeout: 3000,
                });
                this.$eventHub.$emit("refreshTankFillTable");
            })
            .catch((error) => {
                this.$toast(error.response.data.message, {
                  type: "error",
                  timeout: 3000,
                });
            });
        }
    },
  },
};

</script>
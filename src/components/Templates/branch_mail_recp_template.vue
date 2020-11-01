<template>
  <div class="">
    <button class="text-center var_btn" @click="_deleteBranchMailRecp(data.id)">
         Delete  <i class="fa fa-trash-o ml-2" aria-hidden="true" style="color: red"></i>
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
  methods: {
     _deleteBranchMailRecp(id) {
        let resp = confirm("Are you sure want to delete this mail recipient?");
        
        if (resp) {
            this.axios
            .post(
                `${configObject.apiBaseUrl}/Branch/RemoveMailRecipient`, {"id": id} ,
                configObject.authConfig
            )
            .then((res) => {
                this.$toast("Mail Recipient Deleted Successfully", {
                  type: "success",
                  timeout: 3000,
                });
                this.$eventHub.$emit("refreshBranchMailRecps");
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
<template>
  <div>

    <button class="btn branches_btn mr-3" @click="deleteRole(data.id)">
      Delete
    </button> 
  
  </div>
</template>

<script>

import configObject from "@/config";

export default {
  data () {
    return {
        data: {}
    }
  },
  
  methods: {
     deleteRole(id) {
        let resp = confirm("Are you sure want to delete this role?");
        if (resp) {
            this.axios
            .delete(
                `${configObject.apiBaseUrl}/Admin/DeleteRole?id=${id}`,
                configObject.authConfig
            )
            .then((res) => {
                this.$toast("Successfully Deleted Role", {
                type: "success",
                timeout: 3000,
                });
                this.$eventHub.$emit("refreshRolesList");
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
}
</script>
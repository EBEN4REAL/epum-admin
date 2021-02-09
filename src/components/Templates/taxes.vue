<template>
    <div>
        <i class="fa fa-pencil mr-3 primary-color table-icon" aria-hidden="true" @click="openEdit"></i>
        <i class="fa fa-trash table-icon" aria-hidden="true" style="color: red" @click="deleteTax"></i>
    </div>
</template>
<script>
import configObject from "@/config";

export default {
    data() {
        return {
            data: {}
        }
    },
    methods: {
        openEdit() {
            this.$modal.show("editTax")
            this.$eventHub.$emit('showEditTaxesModal', this.data)
        },
        deleteTax() {
            let resp = confirm("Are you sure want to delete this tax?");
            if (resp) {
                this.axios
                .delete(
                    `${configObject.apiBaseUrl}/Invoices/taxes/${this.data.id}`,
                    configObject.authConfig()
                )
                .then((res) => {
                    this.$toast("Tax Deleted Successfully", {
                        type: "success",
                        timeout: 3000,
                    });
                   this.$eventHub.$emit("refreshTaxes");
                })
                .catch((error) => {
                    this.$toast('Failed to delete tax', {
                        type: "error",
                        timeout: 3000,
                    });
                });
            }
        },
    }
}
</script>
<template>
    <div>
        <i class="fa fa-pencil mr-3 primary-color table-icon" aria-hidden="true" @click="openEdit"></i>
        <i class="fa fa-trash table-icon" aria-hidden="true" style="color: red" @click="deleteProduct"></i>
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
            this.$modal.show("editProduct")
            this.$eventHub.$emit('showEditProductModal', this.data)
        },
        deleteProduct() {
            let resp = confirm("Are you sure want to delete this product?");
            if (resp) {
                this.axios
                .delete(
                    `${configObject.apiBaseUrl}/Invoices/products/${this.data.id}`,
                    configObject.authConfig()
                )
                .then((res) => {
                    this.$toast("Product Deleted Successfully", {
                        type: "success",
                        timeout: 3000,
                    });
                   this.$eventHub.$emit("refreshInvoiceProducts");
                })
                .catch((error) => {
                    this.$toast('Failed to delete product', {
                        type: "error",
                        timeout: 3000,
                    });
                });
            }
        },
    }
}
</script>
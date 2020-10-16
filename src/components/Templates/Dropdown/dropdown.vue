<template>
    <div class="dropdown-content" id="myDropdown">
        <router-link v-for="(link, i) in details.info" :key="i" :to="{ name: link.link, query: { ...details.queryStrings } }">
            {{ link.name }}
        </router-link>
        <button class="text-center" @click="deleteNow" v-if="details.delete.hasDelete">
            Delete
        </button>
    </div>
</template>

<script>
export default {
    props: ['details'],
    created() {
    }, 
    methods: {
        deleteNow() {
            this.$eventHub.$emit(this.details.delete.deleteName, this.details.queryStrings.companyId)
            // this.$eventHub.$emit(this.details.delete.deleteName, this.details.queryStrings[this.details.delete.arg])
        }
    },
}
</script>

<style>

</style>
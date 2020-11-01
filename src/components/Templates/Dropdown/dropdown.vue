<template>
    <div class="dropdown-content" id="myDropdown">
        <router-link v-for="(link, i) in details.info" :key="i" :to="{ name: link.link, query: { ...details.queryStrings } }">
            {{ link.name }}
        </router-link>
        <button class="text-center" @click="deleteNow" v-if="details.delete.hasDelete">
            <p style="margin-bottom: 0">{{details.delete.name}}</p>
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
            this.$eventHub.$emit(this.details.delete.deleteName, this.details.queryStrings[this.details.delete.query])
        }
    },
}
</script>

<style>

</style>
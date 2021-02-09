<template>
    <div class="dropdown-content" id="myDropdown">
        <div class="text-center" v-for="(link, i) in details.info" :key="i"  @click="buttonAction(link.emitName)">
            {{ link.name }}
        </div>
        <div class="text-center" @click="deleteNow" v-if="details.delete.hasDelete">
            <p style="margin-bottom: 0">{{details.delete.name}}</p>
        </div>
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
        },
        buttonAction(name) {
            this.$eventHub.$emit(name, this.details.queryStrings.id)
        }
    },
}
</script>

<style>

</style>
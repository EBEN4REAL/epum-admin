<template>
    <div class="dropdown-content" id="myDropdown">
        <!-- <router-link v-for="(link, i) in details.info" :key="i" :to="{ name: $route.name, query: { ...details.queryStrings } }">
            {{ link.name }}
        </router-link> -->
         <div class="text-center" @click="editDevice">
            <p style="margin-bottom: 0">Edit</p>
        </div>
        <div class="text-center" @click="updateFT">
            <p style="margin-bottom: 0">Update FT</p>
        </div>
        <div class="text-center" @click="shutDown" v-if="(details.data.deviceType == 'Pump' || details.data.deviceType == 'Gateway') && (details.data.shutdownPump == false || details.data.shutdownPump == null)">
            <p style="margin-bottom: 0">Shut Down</p>
        </div>
        <div class="text-center" @click="restart" v-if="(details.data.deviceType == 'Pump' || details.data.deviceType == 'Gateway') && details.data.shutdownPump == true">
            <p style="margin-bottom: 0">Restart</p>
        </div>
       
    </div>
</template>

<script>
export default {
    props: ['details'],
    created() {
    }, 
    methods: {
        shutDown() {
            this.$eventHub.$emit('shutDown', this.details.queryStrings.id)
        },
        restart() {
            this.$eventHub.$emit('restart', this.details.queryStrings.id)
        },
        editDevice() {
            this.$eventHub.$emit('editDevice', this.details.data)
        },
        updateFT() {
            this.$eventHub.$emit('updateFT', this.details.data.deviceId)
        }
        
    },
}
</script>

<style>

</style>
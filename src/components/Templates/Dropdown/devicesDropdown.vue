<template>
    <div class="dropdown-content" id="myDropdown">
        <!-- <router-link v-for="(link, i) in details.info" :key="i" :to="{ name: $route.name, query: { ...details.queryStrings } }"> -->
        <!-- <router-link v-for="(link, i) in details.info" :key="i" :to="{name: $route.name}">
            {{ link.name }}
        </router-link> -->
         <button class="text-center" @click="editDevice">
            <p style="margin-bottom: 0">Edit</p>
        </button>
        <button class="text-center" @click="shutDown" v-if="(details.data.deviceType == 'Pump' || details.data.deviceType == 'Gateway') && (details.data.shutdownStatus == false || details.data.shutdownStatus == null)">
            <p style="margin-bottom: 0">Shut Down</p>
        </button>
        <button class="text-center" @click="restart" v-if="(details.data.deviceType == 'Pump' || details.data.deviceType == 'Gateway') && (details.data.shutdownStatus == true || details.data.shutdownStatus !== null)">
            <p style="margin-bottom: 0">Restart</p>
        </button>
       
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
        }
        
    },
}
</script>

<style>

</style>
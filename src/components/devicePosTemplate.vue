<template>
  <div class="button">
    
    <router-link :to="{name: 'edit_companies'}" class="btn btn-info mr-2">Details</router-link>
    <router-link :to="{name: 'company_details'}" class="btn btn-primary mr-2">Console</router-link>    
    <router-link :to="{name: 'edit_companies'}" class="btn btn-warning mr-2">Device</router-link>   
    <router-link :to="{name: 'edit_companies'}" class="btn btn-warning mr-2">Config</router-link>
    <router-link :to="{name: 'edit_companies'}" class="btn btn-warning mr-2">ussd</router-link>
    <router-link :to="{name: 'edit_companies', query: {id: data.index}}" class="btn btn-warning mr-2">Edit</router-link>
  </div>
</template>

<script>

export default {
  data () {
    return {
        data: {}
    }
  },
  mounted() {
  },
}
</script>
<template>
  <div class="button">
    <router-link :to="{name: 'edit_user', query: {id: data.index}}" class="btn btn-warning mr-2">Edit</router-link>
    <router-link :to="{name: 'company_details'}" class="btn btn-primary mr-2">Details</router-link>
    <router-link :to="{name: 'edit_companies'}" class="btn btn-danger mr-2">Delete</router-link>
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
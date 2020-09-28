<template>
  <div class="button">
    <router-link :to="{name: 'edit_companies', query: {id: data.index}}" class="btn btn-warning mr-2">Edit</router-link>
    <router-link :to="{name: 'edit_companies'}" class="btn btn-primary mr-2">Details</router-link>
    <router-link :to="{name: 'edit_companies'}" class="btn btn-info mr-2">Dealers</router-link>
    <router-link :to="{name: 'edit_companies'}" class="btn btn-warning mr-2">Branches</router-link>
    <router-link :to="{name: 'edit_companies'}" class="btn btn-primary mr-2">Sales Rep</router-link>
    <router-link :to="{name: 'edit_companies'}" class="btn btn-primary mr-2">Mail Recipient</router-link>
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
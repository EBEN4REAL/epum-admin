<template>
   <div>
     <router-link :to="{name: 'usersEdit', query: {id: data.id}}" class="btn details_btn mr-3">
      Map User
    </router-link>

    <router-link :to="{name: 'user_details',  query: {id: data.id}}" class="btn dealers_btn mr-3">
      Details
    </router-link>
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
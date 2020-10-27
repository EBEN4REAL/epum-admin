<template>
   <div>
     <router-link :to="{name: 'edit_user', query: {id: data.id}}" class="btn details_btn mr-3">
      Edit
    </router-link>

    <router-link :to="{name: 'user_details',  query: {id: data.id}}" class="btn dealers_btn mr-3">
      Details
    </router-link>

    <!-- <router-link :to="{name:''}" class="btn branches_btn mr-3">
     Delete
    </router-link>  -->
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
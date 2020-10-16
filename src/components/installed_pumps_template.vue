<template>
  <div>
    <router-link :to="{name:'pumpDetails'}" class="btn details_btn mr-3">
       Details
    </router-link>

    <router-link :to="{name:'transactions'}" class="btn dealers_btn mr-3">
     Transaction
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
<template>
   <div class="btn-group btn-group-sm" role="group">
           <router-link v-b-tooltip.hover title="Details" :to="{name:'pumpDetails'}" class="btn btn-primary" >
                <i class="fa fa-info-circle" aria-hidden="true"></i>
          </router-link> 
          <router-link v-b-tooltip.hover title="Transaction" :to="{name:'transactions'}" class="btn btn-warning" >
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
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
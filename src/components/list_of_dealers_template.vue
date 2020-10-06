<template>
   <div class="btn-group btn-group-sm" role="group">
          <router-link v-b-tooltip.hover title="Edit" :to="{name:'editDealers'}" class="btn btn-warning" >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Details" :to="{name:'dealerDetails'}" class="btn btn-primary" >
                <i class="fa fa-info-circle" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Branches" :to="{name:'branches'}" class="btn btn-info" >
                <i class="fa fa-building-o" aria-hidden="true"></i>
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
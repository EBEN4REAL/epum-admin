<template>
  <div class="btn-group btn-group-sm" role="group">
          <router-link v-b-tooltip.hover title="Edit" :to="{name:'edit_companies'}" class="btn btn-warning" >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Details" :to="{name:'company_details'}" class="btn btn-primary" >
                <i class="fa fa-info-circle" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Delete" :to="{name:'map_user_sales_rep'}" class="btn btn-danger" >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
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
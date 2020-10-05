<template>
    <div class="btn-group btn-group-sm" role="group">
          <router-link v-b-tooltip.hover title="Edit" :to="{name:'edit_companies'}" class="btn btn-warning" >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Details" :to="{name:'company_details'}" class="btn btn-primary" >
                <i class="fa fa-info-circle" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Devices" :to="{name:'map_user_sales_rep'}" class="btn btn-info" >
                <i class="fa fa-building-o" aria-hidden="true"></i>
          </router-link> 
            <router-link v-b-tooltip.hover title="Config" :to="{name:'map_user_to_role'}" class="btn btn-primary" >
                <i class="fa fa-mars" aria-hidden="true"></i>
          </router-link>

           <router-link v-b-tooltip.hover title="USSD" :to="{name:'map_user_to_comapny'}" class="btn btn-success" >
                <i class="fa fa-reply" aria-hidden="true"></i>
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
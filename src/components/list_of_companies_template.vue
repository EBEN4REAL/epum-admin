<template>
   <div class="btn-group btn-group-sm" role="group">
          <router-link v-b-tooltip.hover title="Edit" :to="{name:'edit_companies'}" class="btn btn-warning" >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Details" :to="{name:'company_details'}" class="btn btn-primary" >
                <i class="fa fa-info-circle" aria-hidden="true"></i>
          </router-link> 
          <router-link v-b-tooltip.hover title="Dealers" :to="{name:'dealers'}" class="btn btn-warning" >
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Branches" :to="{name:'branches'}" class="btn btn-info" >
                <i class="fa fa-building-o" aria-hidden="true"></i>
          </router-link> 
            <router-link v-b-tooltip.hover title="Sales Rep" :to="{name:'sales_rep'}" class="btn btn-primary" >
                <i class="fa fa-mars" aria-hidden="true"></i>
          </router-link>

           <router-link v-b-tooltip.hover title="Mail Recipient" :to="{name:'mail_recipient'}" class="btn btn-success" >
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
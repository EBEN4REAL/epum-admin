<template>
 <div class="btn-group btn-group-sm" role="group">
          <router-link v-b-tooltip.hover title="Edit" :to="{name:'editBranch'}" class="btn btn-warning" >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </router-link> 
           <router-link v-b-tooltip.hover title="Details" :to="{name:'company_details'}" class="btn btn-primary" >
                <i class="fa fa-info-circle" aria-hidden="true"></i>
          </router-link> 
          <router-link v-b-tooltip.hover title="Fund Branch" :to="{name:'dealers'}" class="btn btn-warning" >
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          </router-link>
            <router-link v-b-tooltip.hover title="Transactions" :to="{name:'sales_rep'}" class="btn btn-primary" >
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
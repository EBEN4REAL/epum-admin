<template>
  <div class="btn-group btn-group-sm" role="group">
    <router-link  title="Edit" :to="{ name: 'editBranch', query: {companyBranchId: data.id}}" class="btn btn-warning" >
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
    </router-link>
    <router-link
      title="Details"
      :to="{ name: 'company_details' }"
      class="btn btn-primary"
    >
      <i class="fa fa-info-circle" aria-hidden="true"></i>
    </router-link>
    <router-link
      
      title="Fund Branch"
      :to="{ name: 'dealers' }"
      class="btn btn-warning"
    >
      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
    </router-link>
    <router-link
      
      title="Transactions"
      :to="{ name: 'transactions' }"
      class="btn btn-primary"
    >
      <i class="fa fa-mars" aria-hidden="true"></i>
    </router-link>
    <router-link
      title="Mail Recipient"
      :to="{ name: 'branchMail_recipent', query: {companyBranchId: data.id} }"
      class="btn btn-success"
    >
      <i class="fa fa-reply" aria-hidden="true"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  mounted() {},
};
</script>
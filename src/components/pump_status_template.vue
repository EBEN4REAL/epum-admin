<template>
  <div class="btn-group btn-group-sm" role="group">
    <router-link
      v-b-tooltip.hover
      title="Edit"
      :to="{ name: 'editPumpStatus', query: { id: data.index } }"
      class="btn btn-warning"
    >
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
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
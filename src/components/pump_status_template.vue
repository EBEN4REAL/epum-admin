<template>
  <div>
    <router-link
      title="Edit"
      :to="{ name: 'editPumpStatus', query: { id: data.index } }"
      class="btn details_btn mr-3"
    >Edit
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
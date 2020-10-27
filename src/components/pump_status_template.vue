<template>
  <div>
    <button  title="Edit" class="btn details_btn mr-3" @click="showPumpStatusEditModal">
      Edit
    </button>
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
  methods: {
    showPumpStatusEditModal() {
       this.$eventHub.$emit('pumpStatusObj', this.data)
      this.$modal.show('editPumpStatusModal')
    }
  }
};
</script>
<template>
  <div>
    <div class="btn details_btn mr-3" @click="showPOSDetailsModal">
       Details
    </div>
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
  methods: {
    showPOSDetailsModal() {
        this.$eventHub.$emit('showPOSDetailsModal', this.data)
    }
  }
}
</script>
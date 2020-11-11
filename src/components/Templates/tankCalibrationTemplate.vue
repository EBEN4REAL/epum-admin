<template>
   <div class="">
    <button class="btn details_btn mr-3" @click="editCalibration">
      Edit
    </button>
    <button class="btn details_btn mr-3" @click="deleteCalibration">
      Delete
    </button>
  </div>
</template>

<script>
import configObject from "@/config";
import Jquery from "jquery";
let $ = Jquery;

export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
      editCalibration() {
          this.$eventHub.$emit('editTankCalibration', this.data)
      },
      deleteCalibration() {
          this.$eventHub.$emit('deleteCalibration', this.data.id)
      }
  }
};
</script>
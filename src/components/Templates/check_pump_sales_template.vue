<template>
  <div class="">
    <button class="btn details_btn mr-3" @click="addStatus()">
         Add Status 
    </button>
    <button class="btn dealers_btn mr-3" @click="edit()">
         Edit 
    </button>
    <button  class="btn delete_btn mr-3" @click="deleteRow()">
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
    edit() {
      this.$eventHub.$emit('editCheckPumpSale', this.data)
    },
    deleteRow() {
      this.$eventHub.$emit('deleteCheckPumpSale', this.data.id)
    },
    addStatus() {
      this.$eventHub.$emit('addStatus', this.data.pumpId)
    }
  },
};

</script>
<template>
  <div class="">
    <button class="text-center var_btn" @click="edit()">
         Edit  <i class="fa fa-edit-o ml-2" aria-hidden="true" style="color: red"></i>
    </button>
    <button class="text-center var_btn" @click="deleteRow()">
         Delete  <i class="fa fa-trash-o ml-2" aria-hidden="true" style="color: red"></i>
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
      }
  },
};

</script>
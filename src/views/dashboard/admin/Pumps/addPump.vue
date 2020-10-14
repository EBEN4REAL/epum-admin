<template>
  <masterLayout>
    <section
      class="mt-3 full__row_section banner-gradient"
      :style="[
        {
          backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
      ]"
    >
      <div
        class="row align-items-center justify-content-center hundred-percent-height"
      >
        <div class="col-md-12">
          <div class="text-center">
            <h5 class="title">Create Pump</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="full__row_section center_div margin-top-center-div mt-3 ep_card">
      <div class="">
        <form>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Associate Pump to Tank</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <select class="form-control">
                      <option disabled selected>
                        Select Associate Pump to Tank
                      </option>
                      <option>AGO Tank 1</option>
                      <option>PMS Tank 1</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Manufacturer</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Model</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Version</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-5">
                <div class="col-md-4">
                   <button class="btn btn-success" @click="addPumpObj">
                      <i class="fa fa-plus mr-2"></i>Add Pump
                    </button>
                </div>
                <div class="col-md-8">
                  <div class="float-right">
                    <!-- <button class="btn btn-success" @click="addPumpObj">
                      <i class="fa fa-plus mr-2"></i>Add Pump
                    </button> -->
                  </div>
                </div>
              </div>
              <hr>
              <div class="" v-for="(pmpObj,i) in pumpArr" :key="i">
                <div class="row align-items-center mt-3">
                  <div class="col-md-4">
                    <label class="label"> Pump Name</label>
                  </div>
                  <div class="col-md-6">
                    <div class="input__block">
                      <input type="text" placeholder="" class="" />
                    </div>
                  </div>
                </div>
                <div class="row align-items-center mt-3" >
                  <div class="col-md-4">
                    <label class="label">Pump Display Name</label>
                  </div>
                  <div class="col-md-6">
                    <div class="input__block">
                      <input type="text" placeholder="" class="" v-model="pmpObj.name" />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <img src="@/assets/img/remove (1).png" v-show="pumpArr.length > 1 && i > 0" style="float: right; cursor: pointer" @click="removePump(i)"/>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <button class="btn btn_theme">Add
                  <img
                    src="@/assets/img/git_loader.gif"
                    style="display:none"
                    width="35px"
                    class="ml-3 loader"
                  />
                </button>
                <!-- <button class="btn btn_theme">Cancel</button> -->
              </div>
        </form>
      </div>
    </div>
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import configObject from "@/config";

import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
  },

  mounted() {},
  data() {
    return {
      backgroundUrl,
      pumpData: {
        branchId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "",
        maxCapacity: 0,
        currentSellingPrice: 0,
        dateCreated: "2020-10-13T13:15:57.193Z",
        dateModified: "2020-10-13T13:15:57.193Z",
        actualVolume: 0,
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      },
      pumpArr: [
        {
          name: "",
          displayName: ""
        }
      ]
    };
  },
  methods: {
    addPumpObj(event) {
      event.preventDefault();
      this.pumpArr.push({name: '', displayName: ''})
    },
    removePump(i) {
      this.pumpArr.splice(i,1)
    }
  }
};
</script>

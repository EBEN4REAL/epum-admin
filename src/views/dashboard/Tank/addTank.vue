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
            <h5 class="title">Create Tank</h5>
          </div>
        </div>
      </div>
    </section>
    <div
      class="full__row_section center_div margin-top-center-div mt-3 ep_card"
    >
      <div class="">
        <form>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label"> Tank Name</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="text" placeholder="" class="" />
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label">Product in Tank</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <select v-model="product" >
                    <option value="select product"  selected>select product</option>
                    <option :value="prod.productId" v-for="(prod, index) in prodList"
                  :key="index">{{prod.name}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label">Max Capacity of Tank</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="text" placeholder="" class="" />
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label">Current Volume</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="text" placeholder="" class="" />
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label">Product Cost Price</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="text" placeholder="" class="" />
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label">Product Selling Price</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="text" placeholder="" class="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="text-center mt-3">
            <button class="btn btn-success mr-3">Save</button>
            <button class="btn btn-light">Cancel</button>
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


export default {
  components: {
    masterLayout,
  },

  mounted() {},
  data() {
    return {
      backgroundUrl,
      prodList: [],
      product: 'select product',
      
    };
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      this.axios
        .get(
          `https://api.epump.com.ng/Products`,
          configObject.authConfig
        )
        .then(response => {
          this.prodList = response.data
            .map(prod => {
              return prod.name;
            });
        })
        .catch(error => {
        });
    },
  }
};
</script>

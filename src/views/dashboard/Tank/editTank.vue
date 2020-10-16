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
            <h5 class="title">Edit Tank</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="full__row_section center_div margin-top-center-div mt-3 ep_card">
      <div class="">
        <form>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label"> Tank Name</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="text" placeholder="" class="" v-model="tankName"/>
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
                    <option :value="prod.id" v-for="(prod, index) in prodList"
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
                <input type="number" placeholder="" class="" v-model="tankCapacity"/>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label">Current Volume</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="number" placeholder="" class="" v-model="currentVolume"/>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label">Product Selling Price</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="number" placeholder="" class="" v-model="sellingPrice"/>
              </div>
            </div>
          </div>
          <div class="form-check form-check-inline mt-4">
            <input class="form-check-input" type="checkbox" id="" @change="toggleATG"> Status
          </div>
          <hr />
          <div class="text-center mt-3">
            <button class="btn btn-success" @click="createTank"
                :disabled="isButtonDisabled ? true : null"
                :style="[
                  isButtonDisabled
                    ? { cursor: 'not-allowed' }
                    : { cursor: 'pointer' }
                ]"
              >Add
                <img
                  src="@/assets/img/git_loader.gif"
                  style="display:none"
                  width="35px"
                  class="ml-3 loader"
                />
            </button> 
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

export default {
  components: {
    masterLayout,
  },

  mounted() {},
  data() {
    return {
      backgroundUrl,
    };
  },
  mounted() {
    this.tankId = this.$route.query.tankId;
    let ml = sessionStorage.getItem(this.tankId);
    if (!ml) {
      let allData = localStorage.getItem("tanksList");
     let dt = JSON.parse(allData);
      dt.forEach((my, index) => {
        if (my.id === this.tankId) {
          ml = JSON.stringify(my);
          sessionStorage.setItem(this.tankId, ml);
        }
      });
    }
    let tankDetails = JSON.parse(ml);
    this.tankDetailsObj = tankDetails;
    console.log(this.tankDetailsObj);
  },
  methods: {
    getProducts() {
      this.axios
        .get(
          `https://testapi.epump.com.ng/Products`,
          configObject.authConfig
        )
        .then(response => {
          this.prodList = response.data
        })
        .catch(error => {
        });
    },
  }
};
</script>

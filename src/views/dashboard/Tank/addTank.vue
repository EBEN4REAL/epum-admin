<template>
  <masterLayout :branchName="branchName">
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
            <h5 class="title">Add Tank</h5>
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
                <select 
                class="input__block"
                v-model="product" >
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
            <input class="form-check-input" type="checkbox" id="" @change="toggleATG"> Has ATG
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
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;


export default {
  components: {
    masterLayout,
  },

  data() {
    return {
      backgroundUrl,
      prodList: [],
      product: 'select product',
      tankName: '',
      tankCapacity: null,
      currentVolume: null,
      sellingPrice: null,
      isButtonDisabled: false,
      hasATG: false,
      branchName: ''
    };
  },
  mounted() {
    this.getProducts()

    const companyBranchId = this.$route.query.companyBranchId
    let ml = sessionStorage.getItem(companyBranchId)
    if (!ml){
        let allData = localStorage.getItem("branchesList")
        let dt = JSON.parse(allData)
        dt.forEach((my, index) =>{
            if(my.id === companyBranchId){
                ml = JSON.stringify(my)
                sessionStorage.setItem(companyBranchId, ml)
            }
        })
    }
    let companyBranchDetails = JSON.parse(ml)
    this.branchName = companyBranchDetails.name
  },
  methods: {
    toggleATG() {
      this.hasATG = !this.hasATG
    },
    getProducts() {
      this.axios
        .get(
          `https://testapi.epump.com.ng/Products`,
          configObject.authConfig()
        )
        .then(response => {
          this.prodList = response.data
        })
        .catch(error => {
        });
    },
    createTank(event) {
      event.preventDefault()
      if(!this.tankName) {
          this.$toast("Please input a tank name", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(this.product == 'select product') {
          this.$toast("Please select a product", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.tankCapacity) {
          this.$toast("Please input a tank capacity", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.currentVolume) {
          this.$toast("Please input a tank volume", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.sellingPrice) {
          this.$toast("Please input a selling price", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      const data = {
        branchId: this.$route.query.companyBranchId,
        name: this.tankName,
        maxCapacity: parseFloat(this.tankCapacity),
        currentSellingPrice: parseFloat(this.sellingPrice),
        actualVolume: parseFloat(this.currentVolume),
        productId: this.product,
        hasATG: this.hasATG
      }
      $('.loader').show();
      this.isButtonDisabled = true;

      this.axios.post(`${configObject.apiBaseUrl}/Tank/AddTank`, data, configObject.authConfig())
          .then(res => {
                this.$toast("Successfully added tank", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
                this.$router.push({ name: "installedTanks", query: {
                  companyBranchId: this.$route.query.companyBranchId
                } });
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast(error.response.data.message, {
                  type: "error",
                  timeout: 3000
              });
          });
    }
  }
};
</script>

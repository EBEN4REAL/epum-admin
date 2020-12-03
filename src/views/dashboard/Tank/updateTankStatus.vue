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
            <h5 class="title">Update Tank Status</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="full__row_section center_div margin-top-center-div mt-3 ep_card">
      <div class="">
        <form>
          <div class="row align-items-center mt-3">
            <div class="col-md-4">
              <label class="label"> Date</label>
            </div>
            <div class="col-md-8">
              <div class="input__block">
                <input type="text" placeholder="" class="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="text-center mt-3">
            <button class="btn btn-success" 
                :disabled="isButtonDisabled ? true : null"
                :style="[
                  isButtonDisabled
                    ? { cursor: 'not-allowed' }
                    : { cursor: 'pointer' }
                ]"
              >Update
                <img
                  src="@/assets/img/git_loader.gif"
                  style="display:none"
                  width="20px"
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
      tankDetailsObj:{},
      sellingPrice: '',
      isButtonDisabled: false,
      branchName: ''
    };
  },
  mounted() {
    this.getProducts()
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


    const companyBranchId = this.$route.query.branchId
    let info = sessionStorage.getItem(companyBranchId)
    if (!info){
        let allData = localStorage.getItem("branchesList")
        let dt = JSON.parse(allData)
        dt.forEach((my, index) =>{
            if(my.id === companyBranchId){
                info = JSON.stringify(my)
                sessionStorage.setItem(companyBranchId, info)
            }
        })
    }
    let companyBranchDetails = JSON.parse(info)
    this.branchName = companyBranchDetails.name
  },
  methods: {
    toggleATG() {
      this.tankDetailsObj.hasATG = !this.tankDetailsObj.hasATG
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
    editTank(event) {
      event.preventDefault()
      if(!this.tankDetailsObj.name) {
          this.$toast("Please input a tank name", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.tankDetailsObj.maxCapacity) {
          this.$toast("Please input a tank capacity", {
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
        branchId: this.$route.query.branchId,
        name: this.tankDetailsObj.name,
        maxCapacity: parseFloat(this.tankDetailsObj.maxCapacity),
        currentSellingPrice: parseFloat(this.sellingPrice),
        actualVolume: parseFloat(this.tankDetailsObj.currentVolume),
        productId: this.tankDetailsObj.productId,
        hasATG: this.tankDetailsObj.hasATG,
        id: this.$route.query.tankId
      }
      $('.loader').show();
      this.isButtonDisabled = true;

      this.axios.put(`${configObject.apiBaseUrl}/Tank/EditTank`, data, configObject.authConfig())
          .then(res => {
                this.$toast("Successfully Updated Tank", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
                this.$router.push({ name: "installedTanks", query: {
                  companyBranchId: this.$route.query.branchId
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

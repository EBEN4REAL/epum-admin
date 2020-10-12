<template>
  <masterLayout>
    <section class="mt-3 full__row_section banner-gradient"  :style="[
            {
              backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }
          ]">
      <div class="row align-items-center justify-content-center hundred-percent-height">
        <div class="col-md-12 ">
          <div class="text-center ">
            <h5 class="title">ADD A DEVICE</h5>
          </div>
        </div>
      </div>
    </section>
    <div  class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
      <div class="">
        <form>
          <div class="text-center">
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Device Type</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" >
                      <option disabled selected>Select Device</option>
                      <option>Pump</option>
                      <option>Tank</option>
                      <option>POS</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row  mt-3">
              <div class="col-md-4 text-left">
                <label>Pumps</label>
              </div>
              <div class="col-md-8 text-left">
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="P1">
                 P1
                </div>
                 <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="A1">
                 A1
                </div>
                 <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="P4">
                 P4
                </div>
                 <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="P3">P3
                </div>
                 <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="P2">
                 P2
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Phone Number</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="tel" placeholder="Phone Number on Device" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Device ID</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="" class="" />
                </div>
              </div>
            </div>
            <div class="row  mt-3">
              <div class="col-md-4 text-left">
                <label></label>
              </div>
              <div class="col-md-8 text-left">
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="Device is Demo">
                 Device is Demo
                </div>
                <div class="text-center mt-3">
                  <button class="btn btn_theme">Create</button>
                </div>
              </div>
            </div>
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
      comapanyBranchObj: {}
    };
  },
  mounted() {
    this.companyBranchId = this.$route.query.companyBranchId
    let ml = sessionStorage.getItem(this.companyBranchId)
    if (!ml){
        let allData = localStorage.getItem("companyBranchesList")
        let dt = JSON.parse(allData)
        dt.forEach((my, index) =>{
            if(my.id === this.companyBranchId){
                ml = JSON.stringify(my)
                sessionStorage.setItem(this.companyBranchId, ml)
            }
        })
    }
    let companyBranchDetails = JSON.parse(ml)
    this.comapanyBranchObj = companyBranchDetails
    console.log(this.comapanyBranchObj)
  }
};
</script>

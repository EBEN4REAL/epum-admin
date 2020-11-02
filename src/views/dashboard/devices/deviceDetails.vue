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
                <h5 class="title">Device  Details</h5>
            </div>
            </div>
        </div>
        </section>
        <div class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
            <div class="">
                <form>
                    <div class="text-center">
                        <div class="row align-items-center mt-3">
                            <div class="col-md-4 text-left">
                                <label>Epump Branches</label >
                            </div>
                            <div class="col-md-8">
                                    <div class="input__block">
                                    <input type="text" placeholder="" class="" />
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mt-3">
                            <div class="col-md-4 text-left">
                            <label>Device Type</label>
                        </div>
                        <div class="col-md-8">
                        <div class="input__block">
                            <select class="form-control">
                                <option value="Pump">POS</option>
                                <option value="Pump">Pump</option>
                                <option value="Tank">Gateway</option>
                            </select>
                        </div>
                        </div>
                        </div>
                        <div class="row align-items-center mt-3">
                            <div class="col-md-4 text-left">
                                <label>User ID</label>
                            </div>
                            <div class="col-md-8">
                                    <div class="input__block">
                                    <input type="text" placeholder="" class="" />
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mt-3">
                            <div class="col-md-4 text-left">
                                <label>Device Pass</label>
                            </div>
                            <div class="col-md-8">
                                <div class="input__block">
                                 <input type="password" placeholder="" class="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <div class="small_card product_details_card toggler-card mt-3">
           <div class="console-details">
                <div class="pt-3 px-4">
                <p>0188373193</p>
                <p>Memory Usage:</p>
                <p>Firmware Version:</p>
                </div>
                 <div class="toggler-button">
                     <label class="mr-2">Light</label>
                     <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitch1" @click="toggler">
                        <label class="custom-control-label" for="customSwitch1">Dark</label>
                    </div>
                 </div>
              <hr />
           </div>
            </div> -->
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import Jquery from 'jquery';
let $ = Jquery;
import configObject from "@/config";

export default {
  components: {
    masterLayout,
  },
  data() {
    return {
      backgroundUrl,
      deviceObj: {}
    };
  },
  mounted() {
    this.deviceId = this.$route.query.deviceId
    let ml = sessionStorage.getItem(this.deviceId)
    if (!ml){
        let allData = localStorage.getItem("devicesList")
        let dt = JSON.parse(allData)
        dt.forEach((my, index) =>{
            if(my.id === this.deviceId){
                ml = JSON.stringify(my)
                sessionStorage.setItem(this.deviceId, ml)
            }
        })
    }

    let deviceDetails = JSON.parse(ml)
    this.deviceObj = deviceDetails
    console.log(this.deviceObj)
  },
  methods: {
    toggler() {
      var element = document.body;
      element.classList.toggle("dark-mode");
    }
  }
};
</script>
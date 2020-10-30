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
                <h5 class="title">Edit Device</h5>
            </div>
            </div>
        </div>
        </section>
        <div class="small_card product_details_card toggler-card mt-3">
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
            </div>
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
    };
  },
  methods: {
    toggler() {
        var element = document.body;
   element.classList.toggle("dark-mode");
    }
  }
};
</script>
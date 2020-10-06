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
            <h5 class="title">  Dealer Details</h5>
          </div>
        </div>
      </div>
    </section>
        <div class="full__row_section mt-3 ep_card">
            <div class="">
                <form>
                    <div class="row ">
                        <div class="col-md-4">
                            <div class="brand_logo_img">
                                <img src="@/assets/img/epump-logo.png"  width="80" />
                            </div>
                        </div>
                        <div class="col-md-8 ">
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label> Parent Company Name</label >
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="JIDSMA OIL & GAS'S DETAILS" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Phone</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="080435678889" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Email</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="eben@ep.com" class="" />
                                    </div>
                                </div>
                            </div>
                           <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Street</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Ologunfe" />
                                    </div>
                                </div>
                        </div>
                        <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >City</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Ikotun" class="" />
                                    </div>
                                </div>
                            </div>
                        <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >State</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Lagos" class="" />
                                    </div>
                                </div>
                            </div>
                         <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Country</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Nigeria" class="" />
                                    </div>
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

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import backgroundUrl from "@/assets/img/bg__card.png";



export default {
    components: {
        masterLayout,
    },
  
    mounted(){
       
    },
    data() {
        return {
          backgroundUrl
        }
    }
}
</script>

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
                        <div class="text-center mt-3">
                            <button class="btn btn_theme"
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
                                width="35px"
                                class="ml-3 loader"
                                />
                            </button>  
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
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        masterLayout,
    },
  
    mounted(){
    
    },
    data() {
        return {
          backgroundUrl,
          companyName: '',
          dealerId: '',
          dealerObj: {},
          states: [],
          isButtonDisabled: false
        }
    },
    methods: {
      
    }
}
</script>

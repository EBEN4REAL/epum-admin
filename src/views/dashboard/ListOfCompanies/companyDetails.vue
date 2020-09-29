<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner" >
                        <h4>JIDSMA OIL & GAS'S DETAILS </h4>
                    </div>
                </div>
            </div>
        </section>
        <div class="full__row_section mt-3 ep_card">
            <div class="">
                <form>
                    <div class="row ">
                        <div class="col-md-6 ">
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label> Company Name</label >
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
                                    <label >Address</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="">
                                        <textarea type="text" placeholder="eben@ep.com" class="" ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="">
                                <input type="file" placeholder="State" />
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



export default {
    components: {
        masterLayout,
    },
  
    mounted(){
       
    },
    data() {
        return {
          
        }
    }
}
</script>

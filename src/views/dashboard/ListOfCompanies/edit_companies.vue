<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner" >
                        <h4>Edit Company Information</h4>
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
                                        <input type="text" placeholder="Company Name" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Phone</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Phone" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Email</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Email" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Street</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Street" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label>City</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="City" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label>Country</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Country" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >State</label>
                                </div>
                                <div class="col-md-8">
                                    <div class="input__block">
                                        <input type="text" placeholder="State" class="" />
                                    </div>
                                     <div class="text-center mt-3">
                                        <button class="btn btn_theme">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label >Change Logo</label>
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

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
                <h5 class="title">Company Details</h5>
            </div>
            </div>
        </div>
        </section>
        <div class="full__row_section mt-3 ep_card mb-5">
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
                                        <input type="text" placeholder="Company Name" class="" disabled v-model="companyObj.name" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Email</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Email" class="" disabled v-model="companyObj.email" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Street</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Street" class="" disabled v-model="companyObj.street"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label>City</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="City" class="" disabled v-model="companyObj.city" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label>Country</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <select class="form-control" name="Country"  v-model="companyObj.country">
                                            <option value="select a country" disabled>select a country</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Kenya">Kenya</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row  mt-3">
                                <div class="col-md-4 ">
                                    <label >State</label>
                                </div>
                                <div class="col-md-8">
                                    <div class="input__block">
                                        <select v-model="companyObj.state" class="form-control">
                                            <option disabled selected value="select state">select state</option>
                                            <option :value="st.name" v-for="(st,i) in states" :key='i'>{{st.name}}</option>
                                        </select>
                                    </div>
                                     <div class="text-center mt-3">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <!-- <label > Company Logo</label> -->
                            <div class="">
                                <img :src="companyObj.url" width="70" height="70" />
                            </div>
                            <div>
                                
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
import configObject from "@/config";

import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        masterLayout,
    },
  
    mounted(){
        this.getStates()
        this.companyId = this.$route.query.companyId
        let ml = sessionStorage.getItem(this.companyId)
        if (!ml){
            let allData = localStorage.getItem("companiesList")
            let dt = JSON.parse(allData)
            dt.forEach((my, index) =>{
                if(my.id === this.companyId){
                    ml = JSON.stringify(my)
                    sessionStorage.setItem(this.companyId, ml)
                }
            })
        }

        let companyDetails = JSON.parse(ml)
        this.companyObj = companyDetails
    },
    data() {
        return {
            companyObj: {},
            backgroundUrl,
            states: []
        }
    },
    methods: {
        getStates() {
            this.axios.get( `https://api.epump.com.ng/Branch/States`, configObject.authConfig)
                .then(res => {
                    this.states = res.data
                })
                .catch(error => {

                });
        },
    }
}
</script>

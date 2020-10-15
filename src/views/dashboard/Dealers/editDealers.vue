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
                <h5 class="title">Edit Dealer</h5>
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
                                <label>Dealer Name</label >
                            </div>
                            <div class="col-md-8">
                                    <div class="input__block">
                                    <input type="text" placeholder="Your Dealer Name" v-model="dealerObj.name" class="" />
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mt-3">
                            <div class="col-md-4 text-left">
                                <label >Street</label>
                            </div>
                            <div class="col-md-8">
                                    <div class="input__block">
                                    <input type="text" placeholder="Street" v-model="dealerObj.street" class="" />
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mt-3">
                            <div class="col-md-4 text-left">
                                <label>City</label>
                            </div>
                            <div class="col-md-8">
                                    <div class="input__block">
                                    <input type="text" placeholder="City" v-model="dealerObj.city" class="" />
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mt-3">
                            <div class="col-md-4 text-left">
                                <label>Country</label>
                            </div>
                            <div class="col-md-8">
                                <div class="input__block">
                                <select class="form-control" v-model="dealerObj.country">
                                    <option disabled selected value="select country">select country</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Kenya">Kenya</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class="row  mt-3">
                            <div class="col-md-4 text-left">
                                <label >State</label>
                            </div>
                            <div class="col-md-8">
                                <div class="input__block">
                                    <select v-model="dealerObj.state" class="form-control">
                                        <option disabled value="select state">select state</option>
                                        <option :value="st.name" v-for="(st,i) in states" :key='i'>{{st.name}}</option>
                                    </select>
                                </div>
                                    <div class="text-center mt-3">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-3">
                            <button class="btn btn_theme" @click="updateDealer"
                                :disabled="isButtonDisabled ? true : null"
                                :style="[
                                isButtonDisabled
                                    ? { cursor: 'not-allowed' }
                                    : { cursor: 'pointer' }
                                ]"
                            >Edit
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
        this.getStates()
        this.dealerId = this.$route.query.dealerId
        let ml = sessionStorage.getItem(this.dealerId)
        if (!ml){
            let allData = localStorage.getItem("dealersList")
            let dt = JSON.parse(allData)
            dt.forEach((my, index) =>{
                if(my.id === this.dealerId){
                    ml = JSON.stringify(my)
                    sessionStorage.setItem(this.dealerId, ml)
                }
            })
        }

        let dealerDetails = JSON.parse(ml)
        this.dealerObj = dealerDetails
    },
    data() {
        return {
          backgroundUrl,
          dealerId: '',
          dealerObj: {},
          states: [],
          isButtonDisabled: false
        }
    },
    methods: {
        getStates() {
            this.axios.get( `https://api.epump.com.ng/Branch/States`, configObject.authConfig)
                .then(res => {
                    console.log(res.data)
                    this.states = res.data
                })
                .catch(error => {

                });
        },
        updateDealer(event) {
            event.preventDefault();
            if(!this.dealerObj.name) {
                this.$toast("Dealer Name Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.dealerObj.street) {
                this.$toast("Street Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.dealerObj.city) {
                this.$toast("City Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(this.dealerObj.country === "select country") {
                this.$toast("Please Select a country", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(this.dealerObj.state === 'select state') {
                this.$toast("please select state", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            this.isButtonDisabled = true;
            
            const data = {
                name: this.dealerObj.name,
                street: this.dealerObj.street,
                city: this.dealerObj.city,
                state: this.dealerObj.state,
                country: this.dealerObj.country,
                companyId: this.dealerObj.companyId,
                id: this.$route.query.dealerId,
            }
            console.log(data);
            $('.loader').show();
            this.axios.put(`${configObject.apiBaseUrl}/Company/UpdateDealer`, data, configObject.authConfig)
                .then(res => {
                    this.$toast("Successfully edited dealer", {
                        type: "success",
                        timeout: 3000
                    });
                    $('.loader').hide();
                    this.isButtonDisabled = false;
                    this.$router.push({ name: "dealers", query: {
                        companyId: this.dealerObj.companyId
                        }});
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response)
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
        },
    }
}
</script>

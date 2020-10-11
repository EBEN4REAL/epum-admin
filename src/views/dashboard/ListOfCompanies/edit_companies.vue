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
                <h5 class="title">Edit  Company</h5>
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
                                        <input type="text" placeholder="Company Name" class="" v-model="companyObj.name" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Phone</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Phone" class=""  v-model="Phone"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Email</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Email" class="" v-model="companyObj.email" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Street</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="Street" class=""  v-model="companyObj.street"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label>City</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="City" class="" v-model="companyObj.city" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label>Country</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <select class="form-control" name="Country" v-model="companyObj.country">
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
                                        <button class="btn btn_theme" @click="updateForm">Save
                                             <img
                                                src="@/assets/img/git_loader.gif"
                                                style="display:none"
                                                width="35px"
                                                class="ml-3 loader"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label >Change Logo</label>
                            <div class="">
                                <b-form-file
                                    v-model="Logo"
                                    :state="Boolean(Logo)"
                                    placeholder="Upload Logo"
                                    accept="image/jpeg, image/png, image/gif">
                                </b-form-file>
                            </div>
                            <div>
                                <!-- <img :src="companyObj.url" width="70" height="70" /> -->
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
        let companyList = JSON.parse(localStorage.getItem("companiesList"));
        this.companyObj = companyList.filter(el => el.id === this.$route.query.companyId)[0]
        console.log(this.companyObj)
    },
    data() {
        return {
            companyObj: {},
            backgroundUrl,
            Logo: "",
            Phone: null,
            states: []
        }
    },
    methods: {
        validateEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true;
            }
            return false;
        },
        getStates() {
            this.axios.get( `https://api.epump.com.ng/Branch/States`, configObject.authConfig)
                .then(res => {
                    console.log(res.data)
                    this.states = res.data
                })
                .catch(error => {

                });
        },
        updateForm(event){
            event.preventDefault()
            if(!this.companyObj.name) {
                this.$toast("Company Name Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.Phone) {
                this.$toast("Phone Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.companyObj.email) {
                this.$toast("Email Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }else {
                if(!this.validateEmail(this.companyObj.email)) {
                this.$toast("Invalid Email Format", {
                    type: "error", 
                    timeout: 3000
                });
                return;
                }
            }
            if(!this.companyObj.street) {
                this.$toast("Street Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.companyObj.city) {
                this.$toast("City Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.companyObj.country) {
                this.$toast("Select a valid country", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.companyObj.state) {
                this.$toast("State Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.Logo) {
                this.$toast("Please select a logo", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            let formData = new FormData()
            formData.append('Company.State', this.companyObj.state)
            formData.append('Company.Country', this.companyObj.country)
            formData.append('Company.Phone', this.Phone)
            formData.append('Company.City', this.companyObj.city)
            formData.append('Company.Name', this.companyObj.name)
            formData.append('Company.Email', this.companyObj.email)
            formData.append('Company.Id', this.$route.query.companyId)
            formData.append('Logo', this.Logo)
            $('.loader').show();
            this.axios.put(`${configObject.apiBaseUrl}/Company/EditCompany`,formData, configObject.authConfigForUpload)
                .then(res => {
                        this.$toast("Company updated successfully", {
                            type: "success",
                            timeout: 3000
                        });
                        this.$router.push({name: 'list_of_companies'})
                        $('.loader').hide();
                        this.isButtonDisabled = false;
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast("Unable to updated company", {
                        type: "error",
                        timeout: 3000
                    });
                });
            },
    }
}
</script>

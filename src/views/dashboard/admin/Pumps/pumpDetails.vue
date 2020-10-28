<template>
    <masterLayout :branchName="branchName">
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
            <h5 class="title">  Pump Details</h5>
          </div>
        </div>
      </div>
    </section>
        <div class="full__row_section mt-3 ep_card">
            <div class="">
                <!-- <form> -->
                    <div class="row ">
                        <div class="col-md-6 ">
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label"> Pump Name</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="A1" class="" v-model="pumpDetails.name"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Display Name</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="AGO 1" class="" v-model="pumpDetails.displayName"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Associate Pump to Tank</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <select class="form-control" v-model="pumpDetails.tankName">
                                            <option disabled selected value="selectATank">
                                                Select Associate Pump to Tank
                                            </option>
                                            <option v-for="(tank, index) in tanks" :key="index" :value="tank.name">{{tank.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                           <!-- <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Reading</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="number" placeholder="" class="" v-model="pumpDetails.currentReading">
                                    </div>
                                </div>
                            </div> -->
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Calibration <small>xLtr-20Ltr</small></label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="number" placeholder="" readonly class="" v-model="pumpCalibration">
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Manufacturer</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="" class="" v-model="pumpDetails.manufacturer">
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Model </label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" placeholder="" class="" v-model="pumpDetails.model">
                                    </div>
                                </div>
                            </div>
                           <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Status</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <select class="form-control" v-model="pumpDetails.status">
                                            <option disabled selected>Select Pump Status</option>
                                            <option value="Working Properly">Working Properly</option>
                                            <option value="Under Maintenance">Under Maintenance</option>
                                            <option value="Spoilt">Spoilt</option>
                                        </select>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div class="col-md-6">
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Totalizer Multiplier </label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="number" placeholder="" class="" v-model="totalMultiplier">
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Volume<br> Multiplier </label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="number" placeholder="" class="" v-model="volumeMultiplier">
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label class="label">Pump Amount Multiplier </label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="number" placeholder="" class="" v-model="amountMultiplier">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5" style="margin: 0 auto;">
                            <button class="btn btn_theme" @click="updatePump"
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
                <!-- </form> -->
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
    data() {
        return {
          backgroundUrl,
          pumpDetails: {},
          tanks: [],
          isButtonDisabled: false,
          tankId: '',
          pumpCalibration: null,
          volumeMultiplier: null,
          amountMultiplier: null,
          totalMultiplier: null,
          branchName: ''
        }
    },
    mounted(){
        this.getTanks()
        this.getPumpCalibration()
        this.getPumpDetails()
        
       this.pumpId = this.$route.query.id
        let ml = sessionStorage.getItem(this.pumpId)
        if (!ml){
            let allData = localStorage.getItem("pumpsList")
            let dt = JSON.parse(allData)
            dt.forEach((my, index) =>{
                if(my.id === this.pumpId){
                    ml = JSON.stringify(my)
                    sessionStorage.setItem(this.pumpId, ml)
                }
            })
        }

        this.pumpDetails = JSON.parse(ml)


        const companyBranchId = this.$route.query.companyBranchId
        let info = sessionStorage.getItem(companyBranchId)
        if (!info){
            let allData = localStorage.getItem("branchesList")
            let dt = JSON.parse(allData)
            dt.forEach((my, index) =>{
                if(my.id === companyBranchId){
                    info = JSON.stringify(my)
                    sessionStorage.setItem(companyBranchId, info)
                }
            })
        }
        let companyBranchDetails = JSON.parse(info)
        this.branchName = companyBranchDetails.name
    },
    methods: {
        getTanks() {
            this.axios
            .get(
            `${configObject.apiBaseUrl}/Branch/Tanks/${this.$route.query.companyBranchId}`,
            configObject.authConfig
            )
            .then(response => {
                this.tanks = response.data
            })
            .catch(error => {});
        },
        getPumpCalibration() {
            this.axios
                .get(
                `${configObject.apiBaseUrl}/Pumps/PumpCalibration/${this.$route.query.id}`,
                configObject.authConfig
                )
                .then(response => {
                    this.pumpCalibration = response.data
                        ? parseFloat(response.data).toFixed(2)
                        : 0;
                })
                .catch(error => {});
        },
        getPumpDetails() {
            this.axios
                .get(
                `${configObject.apiBaseUrl}/Branch/Pumps/Detail/${this.$route.query.id}`,
                configObject.authConfig
                )
                .then(response => {
                    this.volumeMultiplier = response.data.volumeMultiplier
                    this.amountMultiplier = response.data.amountMultiplier
                    this.totalMultiplier = response.data.totalMultiplier
                })
                .catch(error => {});
        },
        updatePump() {
            if(!this.pumpDetails.name) {
                this.$toast("Please input a pump name", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.pumpDetails.displayName) {
                this.$toast("Please input a display name", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.pumpDetails.currentReading && this.pumpDetails.currentReading !== 0) {
                this.$toast("Please input a reading", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.pumpDetails.manufacturer) {
                this.$toast("Please input a manufacturer", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.pumpDetails.model) {
                this.$toast("Please input a model", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.pumpDetails.model) {
                this.$toast("Please input a model", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.pumpDetails.status) {
                this.$toast("Please select a pump status", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }

            this.tankId = this.tanks.filter(cur => cur.name == this.pumpDetails.tankName)[0].id


            const data = {
                tankId: this.tankId,
                name: this.pumpDetails.name,
                manufacturer: this.pumpDetails.manufacturer,
                model: this.pumpDetails.model,
                version: "string",
                displayName: this.pumpDetails.displayName,
                branchId: this.pumpDetails.branchId,
                status: this.pumpDetails.status,
                ipAddress: this.pumpDetails.ipAddress,
                ssid: this.pumpDetails.ssid,
                password: this.pumpDetails.password,
                standardCalibration: this.pumpCalibration ? parseFloat(this.pumpCalibration) : 0,
                totalMultiplier: this.totalMultiplier ? parseFloat(this.totalMultiplier) : 0,
                amountMultiplier: this.amountMultiplier ? parseFloat(this.amountMultiplier) : 0,
                volumeMultiplier: this.volumeMultiplier ? parseFloat(this.volumeMultiplier) : 0,
                id: this.pumpDetails.id
            }
            
            this.isButtonDisabled = true

            $('.loader').show();
            this.axios.put(`${configObject.apiBaseUrl}/Pumps/EditPump`, data, configObject.authConfig)
                .then(res => {
                        this.$toast("Successfully updated pump", {
                            type: "success",
                            timeout: 3000
                        });
                        this.isButtonDisabled = false;
                        $('.loader').hide();
                        this.$router.push({name: 'installedPumps', query: { companyBranchId: this.$route.query.companyBranchId }})
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
            }
    }
    
}
</script>
